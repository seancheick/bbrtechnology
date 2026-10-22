"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Edges, RoundedBox } from "@react-three/drei";
import type { Group, Mesh } from "three";

// The B&Br product stack in 3D: data plinth, logic board, integration plate and a
// screen, with packets of work flowing up through them. The pointer tilts the stack
// and spreads the layers; at rest it floats slightly open. Loaded only on desktop.

const NAVY = "#1c2745";
const NAVY_2 = "#243256";
const NAVY_3 = "#2e3e68";
const GOLD = "#fbbf24";
const AMBER = "#d97706";

const LAYERS = [
  { y: 0, h: 0.42, w: 2.6, color: NAVY },
  { y: 0.72, h: 0.22, w: 2.3, color: NAVY_2 },
  { y: 1.22, h: 0.14, w: 2.1, color: NAVY_3 },
  { y: 1.72, h: 0.1, w: 1.95, color: NAVY },
];

function Stack({ pointer }: { pointer: React.RefObject<{ x: number; y: number; over: boolean }> }) {
  const group = React.useRef<Group>(null);
  const layers = React.useRef<(Group | null)[]>([]);
  const packets = React.useRef<(Mesh | null)[]>([]);
  const spread = React.useRef(1);

  useFrame((state, dt) => {
    const p = pointer.current;
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // tilt toward the pointer, ease back to a composed three-quarter view at rest
    const ry = (p?.over ? p.x * 0.45 : 0) - 0.62;
    const rx = (p?.over ? -p.y * 0.18 : 0) + 0.1;
    g.rotation.y += (ry - g.rotation.y) * Math.min(1, dt * 3);
    g.rotation.x += (rx - g.rotation.x) * Math.min(1, dt * 3);
    g.position.y = Math.sin(t * 0.8) * 0.06 - 0.85;
    // layers spread while the pointer is over the scene
    const target = p?.over ? 1.55 : 1;
    spread.current += (target - spread.current) * Math.min(1, dt * 2.5);
    layers.current.forEach((l, i) => {
      if (l) l.position.y = LAYERS[i].y * spread.current;
    });
    // work packets rise from the plinth to the screen, one after another
    packets.current.forEach((m, i) => {
      if (!m) return;
      const k = (t * 0.28 + i / packets.current.length) % 1;
      m.position.y = -0.1 + k * (LAYERS[3].y * spread.current + 0.25);
      const s = Math.sin(Math.PI * k);
      m.scale.setScalar(0.25 + s * 0.75);
    });
  });

  return (
    <group ref={group} rotation={[0.1, -0.62, 0]}>
      {LAYERS.map((L, i) => (
        <group key={i} ref={(el) => { layers.current[i] = el; }} position={[0, L.y, 0]}>
          <RoundedBox args={[L.w, L.h, L.w]} radius={Math.min(0.12, L.h / 2.2)} smoothness={4}>
            <meshPhysicalMaterial color={L.color} roughness={0.38} metalness={0.25} clearcoat={0.7} clearcoatRoughness={0.25} />
            <Edges threshold={20} color={i === 3 ? GOLD : "#93a6d6"} />
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
                <meshStandardMaterial color="#0b1430" emissive="#1e3a8a" emissiveIntensity={0.35} />
              </mesh>
              {/* a dashboard on the screen: a header bar, two cards and a chart line */}
              <mesh position={[0, 0.58, 0.002]}>
                <planeGeometry args={[1.3, 0.12]} />
                <meshBasicMaterial color={GOLD} transparent opacity={0.85} />
              </mesh>
              {[-0.34, 0.34].map((x) => (
                <mesh key={x} position={[x, 0.18, 0.002]}>
                  <planeGeometry args={[0.6, 0.42]} />
                  <meshBasicMaterial color="#26355c" />
                </mesh>
              ))}
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <mesh key={n} position={[-0.55 + n * 0.22, -0.42 + (n % 3) * 0.08, 0.002]}>
                  <planeGeometry args={[0.12, 0.2 + (n % 3) * 0.16]} />
                  <meshBasicMaterial color={n === 4 ? GOLD : "#4a5c8c"} />
                </mesh>
              ))}
            </group>
          )}
        </group>
      ))}
      {/* work rising through the stack, just outside its front corner */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { packets.current[i] = el; }} position={[1.55, 0, 1.55]}>
          <sphereGeometry args={[0.065, 20, 20]} />
          <meshBasicMaterial color={GOLD} />
        </mesh>
      ))}
      <mesh position={[1.55, 1.0, 1.55]}>
        <cylinderGeometry args={[0.006, 0.006, 2.3, 6]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const wrap = React.useRef<HTMLDivElement>(null);
  const pointer = React.useRef({ x: 0, y: 0, over: false });
  const [visible, setVisible] = React.useState(true);

  // stop rendering while the hero is off screen
  React.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute inset-0"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current = { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1, over: true };
      }}
      onPointerLeave={() => {
        pointer.current = { ...pointer.current, over: false };
      }}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 3.1, 7.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => onReady?.()}
        aria-hidden
      >
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#dbe4ff", "#0a0f1a", 0.6]} />
        <directionalLight position={[-4, 6, 4]} intensity={2.6} />
        <directionalLight position={[5, 2, -2]} intensity={0.9} color="#9fb4ff" />
        <pointLight position={[1.5, 3, 1.5]} intensity={8} distance={6} color={AMBER} />
        <Stack pointer={pointer} />
        <ContactShadows position={[0, -1.15, 0]} opacity={0.35} scale={7} blur={2.6} far={3} resolution={256} frames={1} color="#0a0f1a" />
      </Canvas>
    </div>
  );
}
