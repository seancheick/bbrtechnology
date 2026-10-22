"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Edges, RoundedBox } from "@react-three/drei";
import type { Group, Mesh, PointLight } from "three";

// The B&Br product stack in 3D: data plinth, logic board, integration plate and a
// screen. It turns to follow the cursor anywhere in the hero, under a warm light that
// tracks the mouse. Hovering a layer lifts it and says what it is; clicking runs a
// request up through the stack until the dashboard updates. Loaded only on desktop.

const NAVY = "#1c2745";
const NAVY_2 = "#243256";
const NAVY_3 = "#2e3e68";
const GOLD = "#fbbf24";
const AMBER = "#d97706";
const EDGE = "#93a6d6";

const LAYERS = [
  { y: 0, h: 0.42, w: 2.6, color: NAVY, name: "Data", line: "Databases, pipelines and reporting" },
  { y: 0.72, h: 0.22, w: 2.3, color: NAVY_2, name: "Logic", line: "Automations and AI that follow your rules" },
  { y: 1.22, h: 0.14, w: 2.1, color: NAVY_3, name: "APIs", line: "Integrations, and MCP for AI agents" },
  { y: 1.72, h: 0.1, w: 1.95, color: NAVY, name: "Screen", line: "Websites, web apps and mobile apps" },
];
const RUN_SECONDS = 2.4;

type Pointer = { x: number; y: number; over: boolean };

function Stack({
  pointer,
  runAt,
  onHover,
  onDone,
}: {
  pointer: React.RefObject<Pointer>;
  runAt: React.RefObject<number>;
  onHover: (i: number) => void;
  onDone: (done: boolean) => void;
}) {
  const group = React.useRef<Group>(null);
  const layers = React.useRef<(Group | null)[]>([]);
  const packets = React.useRef<(Mesh | null)[]>([]);
  const runner = React.useRef<Mesh>(null);
  const bar = React.useRef<Mesh>(null);
  const spot = React.useRef<PointLight>(null);
  const spread = React.useRef(1.15);
  const lift = React.useRef([0, 0, 0, 0]);
  const [hovered, setHovered] = React.useState(-1);
  React.useEffect(() => onHover(hovered), [hovered, onHover]);
  const [lit, setLit] = React.useState(-1);
  const [done, setDone] = React.useState(false);
  const litRef = React.useRef(-1);
  const doneRef = React.useRef(false);

  useFrame((state, dt) => {
    const p = pointer.current;
    const g = group.current;
    if (!g || !p) return;
    const t = state.clock.elapsedTime;
    const ease = Math.min(1, dt * 4);

    // face the cursor, like something paying attention
    const ry = (p.over ? p.x * 0.85 : 0) - 0.62;
    const rx = (p.over ? p.y * 0.3 : 0) + 0.1;
    g.rotation.y += (ry - g.rotation.y) * ease;
    g.rotation.x += (rx - g.rotation.x) * ease;
    g.position.y = Math.sin(t * 0.8) * 0.05 - 1.05;

    // the warm light follows the mouse across the front of the stack
    if (spot.current) {
      const tx = p.over ? p.x * 3.2 : 1.5;
      const ty = p.over ? 2.2 - p.y * 2.2 : 3;
      spot.current.position.x += (tx - spot.current.position.x) * ease;
      spot.current.position.y += (ty - spot.current.position.y) * ease;
      spot.current.intensity += ((p.over ? 16 : 7) - spot.current.intensity) * ease;
    }

    // layers open while the pointer is in the hero; a hovered layer lifts further
    spread.current += ((p.over ? 1.4 : 1.15) - spread.current) * Math.min(1, dt * 2.5);
    layers.current.forEach((l, i) => {
      if (!l) return;
      lift.current[i] += ((hovered === i ? 0.22 : 0) - lift.current[i]) * ease;
      l.position.y = LAYERS[i].y * spread.current + lift.current[i];
    });
    const topY = LAYERS[3].y * spread.current + lift.current[3];

    // ambient work packets rising along the front corner
    packets.current.forEach((m, i) => {
      if (!m) return;
      const k = (t * 0.28 + i / packets.current.length) % 1;
      m.position.y = -0.1 + k * (topY + 0.25);
      m.scale.setScalar(0.25 + Math.sin(Math.PI * k) * 0.75);
    });

    // a click runs one request up the stack, lighting each layer as it passes
    const run = runAt.current ?? -1;
    const elapsed = run < 0 ? -1 : (performance.now() - run) / 1000;
    const k = elapsed >= 0 && elapsed < RUN_SECONDS ? elapsed / RUN_SECONDS : -1;
    if (runner.current) {
      runner.current.visible = k >= 0;
      if (k >= 0) {
        runner.current.position.y = -0.1 + k * (topY + 0.3);
        runner.current.scale.setScalar(1 + Math.sin(k * Math.PI * 6) * 0.15);
      }
    }
    const nowLit = k < 0 ? -1 : Math.min(3, Math.floor(k * 4));
    if (nowLit !== litRef.current) {
      litRef.current = nowLit;
      setLit(nowLit);
    }
    const isDone = elapsed >= RUN_SECONDS * 0.9 && elapsed < RUN_SECONDS + 2.5;
    if (isDone !== doneRef.current) {
      doneRef.current = isDone;
      setDone(isDone);
      onDone(isDone);
    }
    // the dashboard's highlighted bar grows when the request lands, then settles
    if (bar.current) {
      const target = isDone ? 1.9 : 1;
      bar.current.scale.y += (target - bar.current.scale.y) * Math.min(1, dt * 5);
    }
  });

  return (
    <group ref={group} rotation={[0.1, -0.62, 0]}>
      <pointLight ref={spot} position={[1.5, 3, 3]} intensity={7} distance={8} color={AMBER} />
      {LAYERS.map((L, i) => {
        const active = hovered === i || lit === i;
        return (
          <group
            key={L.name}
            ref={(el) => { layers.current[i] = el; }}
            position={[0, L.y, 0]}
            // the whole layer counts, including its screen, pads and ports
            onPointerMove={(e) => {
              e.stopPropagation();
              if (hovered !== i) setHovered(i);
            }}
            onPointerLeave={() => setHovered((h) => (h === i ? -1 : h))}
          >
            <RoundedBox args={[L.w, L.h, L.w]} radius={Math.min(0.12, L.h / 2.2)} smoothness={4}>
              <meshPhysicalMaterial
                color={L.color}
                roughness={0.38}
                metalness={0.25}
                clearcoat={0.7}
                clearcoatRoughness={0.25}
                emissive={AMBER}
                emissiveIntensity={lit === i ? 0.25 : 0}
              />
              <Edges threshold={20} color={active || i === 3 ? GOLD : EDGE} />
            </RoundedBox>
            {i === 0 &&
              [-0.75, 0, 0.75].map((x) => (
                <mesh key={x} position={[x, 0, L.w / 2 + 0.005]}>
                  <planeGeometry args={[0.55, 0.1]} />
                  <meshBasicMaterial color="#0b1222" />
                </mesh>
              ))}
            {i === 1 &&
              [-0.6, 0, 0.6].flatMap((x) =>
                [-0.6, 0, 0.6].map((z) => (
                  <RoundedBox key={`${x}${z}`} args={[0.42, 0.07, 0.42]} radius={0.03} position={[x, L.h / 2 + 0.035, z]}>
                    <meshStandardMaterial color="#3b4a72" roughness={0.3} metalness={0.4} />
                  </RoundedBox>
                ))
              )}
            {i === 2 &&
              [-0.8, -0.4, 0, 0.4, 0.8].map((x) => (
                <mesh key={x} position={[x, 0, L.w / 2 + 0.01]}>
                  <sphereGeometry args={[0.028, 12, 12]} />
                  <meshBasicMaterial color={GOLD} />
                </mesh>
              ))}
            {i === 3 && (
              <group position={[0, L.h / 2 + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <mesh>
                  <planeGeometry args={[1.62, 1.62]} />
                  <meshStandardMaterial color="#0b1430" emissive="#1e3a8a" emissiveIntensity={done ? 0.7 : 0.35} />
                </mesh>
                {/* a dashboard on the screen: a header bar, two cards and a bar chart */}
                <mesh position={[0, 0.58, 0.002]}>
                  <planeGeometry args={[1.3, 0.12]} />
                  <meshBasicMaterial color={GOLD} transparent opacity={0.85} />
                </mesh>
                {[-0.34, 0.34].map((x) => (
                  <mesh key={x} position={[x, 0.18, 0.002]}>
                    <planeGeometry args={[0.6, 0.42]} />
                    <meshBasicMaterial color={done && x > 0 ? "#3a5596" : "#26355c"} />
                  </mesh>
                ))}
                {[0, 1, 2, 3, 4, 5].map((n) => {
                  const h = 0.2 + (n % 3) * 0.16;
                  return (
                    <mesh
                      key={n}
                      ref={n === 4 ? bar : undefined}
                      position={[-0.55 + n * 0.22, -0.52 + h / 2, 0.002]}
                    >
                      <planeGeometry args={[0.12, h]} />
                      <meshBasicMaterial color={n === 4 ? GOLD : "#4a5c8c"} />
                    </mesh>
                  );
                })}
              </group>
            )}
          </group>
        );
      })}
      {/* work rising through the stack, just outside its front corner */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { packets.current[i] = el; }} position={[1.55, 0, 1.55]}>
          <sphereGeometry args={[0.065, 20, 20]} />
          <meshBasicMaterial color={GOLD} />
        </mesh>
      ))}
      <mesh ref={runner} visible={false} position={[1.55, 0, 1.55]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshBasicMaterial color="#fff3c4" />
      </mesh>
      <mesh position={[1.55, 1.0, 1.55]}>
        <cylinderGeometry args={[0.006, 0.006, 2.3, 6]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrap = React.useRef<HTMLDivElement>(null);
  const pointer = React.useRef<Pointer>({ x: 0, y: 0, over: false });
  const runAt = React.useRef(-1);
  const [visible, setVisible] = React.useState(true);
  const [hovered, setHovered] = React.useState(-1);
  const [done, setDone] = React.useState(false);

  // stop rendering while the hero is off screen
  React.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // follow the cursor anywhere in the hero section, not only over the canvas
  React.useEffect(() => {
    const el = wrap.current;
    const hero = el?.closest("section");
    if (!el || !hero) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      pointer.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))),
        over: true,
      };
    };
    const leave = () => {
      pointer.current = { ...pointer.current, over: false };
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 cursor-pointer">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 3.4, 9.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => onReady?.()}
        onClick={() => {
          if (runAt.current < 0 || performance.now() - runAt.current > (RUN_SECONDS + 2.5) * 1000) runAt.current = performance.now();
        }}
        aria-hidden
      >
        <ambientLight intensity={0.5} />
        <hemisphereLight args={["#dbe4ff", "#0a0f1a", 0.6]} />
        <directionalLight position={[-4, 6, 4]} intensity={2.4} />
        <directionalLight position={[5, 2, -2]} intensity={0.9} color="#9fb4ff" />
        <Stack pointer={pointer} runAt={runAt} onHover={setHovered} onDone={setDone} />
        <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={7} blur={2.6} far={3} resolution={256} frames={1} color="#0a0f1a" />
      </Canvas>
      {/* captions live in the page, inside this frame, so nothing can clip them */}
      <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-center" aria-live="polite">
        {done && (
          <span className="rounded-full bg-gold-400 px-3 py-1 text-xs font-semibold text-navy-950 shadow-lg">
            Request in → task done
          </span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-2" aria-live="polite">
        {hovered >= 0 ? (
          <div className="w-full max-w-xs rounded-xl border border-gold-400/30 bg-navy-950/95 px-4 py-3 text-center text-white shadow-2xl">
            <p className="font-display text-base font-extrabold text-gold-400">{LAYERS[hovered].name}</p>
            <p className="mt-0.5 text-sm leading-snug text-white/90">{LAYERS[hovered].line}</p>
          </div>
        ) : (
          <p className="eyebrow text-foreground-subtle">Hover a layer · click to run it</p>
        )}
      </div>
    </div>
  );
}
