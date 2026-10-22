/**
 * Stack: a product, exploded into its four layers. A data plinth with drive
 * bays, a logic board with chip pads, an integration plate ringed with ports,
 * and a screen on top. The pointer's x pulls the layers apart on one spring;
 * its height picks a layer, which takes the bright edge. At rest the stack is
 * slightly, unevenly open and the screen's bezel is lit. The slider is the gap.
 *
 * The pattern: scrub and pick. A spring for the gap, a pick tested against the
 * target pose (which depends only on x), and paint order bottom to top.
 */
const {
  Cam, clamp, facing, fit, poly, prism, proj, ringAt, rings, rrect, spring, stepS,
  disposer, flatDot, mk, place, pointer, put, register, solid,
} = HL;

// bottom to top: name, footprint, thickness, rest gap share, a small rest offset
const LAYERS = [
  { name: "data", w: 94, h: 16, share: 0, dx: 0 },
  { name: "logic", w: 84, h: 9, share: 1.7, dx: 3 },
  { name: "api", w: 76, h: 5, share: 1.1, dx: -2 },
  { name: "screen", w: 70, h: 4, share: 2.0, dx: 4 },
];
const SPREAD = 1.4;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let gap = value;

  const zAt = (g) => {
    let z = 0;
    return LAYERS.map((L, i) => {
      if (i) z += g * L.share;
      const z0 = z;
      z += L.h;
      return z0;
    });
  };
  const top = zAt(16 * SPREAD), lastL = LAYERS[3];
  const onFace = (ring, y, z0) => ring.map((q) => P(q.u, y, z0 + q.v));
  const C = Cam(45, 0.5, 1.66);
  fit(C, [[-50, -50, 0], [50, 50, 0], [50, -50, 0], [-50, 50, 0], [0, 0, top[3] + lastL.h]], 200, 168);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const parts = LAYERS.map((L, i) => {
    const grp = mk("g", {}, g), half = L.w / 2;
    const [ring, inner] = rings(L.dx - half, L.dx - half, L.dx + half, L.dx + half, i === 0 ? 10 : 8, 1.6);
    const el = solid(grp);
    const marks = [];
    if (L.name === "data") {
      // three drive bays set into the plinth's front face
      for (let k = 0; k < 3; k++) {
        const u = -33 + k * 23;
        marks.push({ el: mk("path", { class: "nf lo" }, grp), ring: rrect(u, 5, u + 19, 10.5, 2.2, 4), face: half });
      }
    }
    const pads = [];
    if (L.name === "logic") {
      // a 3 × 3 field of chip pads, painted back to front
      for (let s = 0; s <= 4; s++) for (let a = 0; a < 3; a++) {
        const b = s - a;
        if (b < 0 || b > 2) continue;
        const x0 = L.dx - 28 + a * 20, y0 = L.dx - 28 + b * 20;
        const [pr, pi] = rings(x0, y0, x0 + 15, y0 + 15, 2.4, 0.8);
        pads.push({ el: solid(grp), pr, pi });
      }
    }
    const ports = [];
    if (L.name === "api") {
      for (let k = 0; k < 5; k++) ports.push({ el: flatDot(grp, C, 1.1, "dot off"), u: L.dx - 26 + k * 13, v: L.dx + half - 5 });
      for (let k = 0; k < 4; k++) ports.push({ el: flatDot(grp, C, 1.1, "dot off"), u: L.dx + half - 5, v: L.dx - 20 + k * 13 });
    }
    let bezel = null;
    if (L.name === "screen") bezel = { el: mk("path", { class: "nf hi" }, grp), ring: rrect(L.dx - half + 7, L.dx - half + 7, L.dx + half - 7, L.dx + half - 7, 4, 4) };
    return { L, ring, inner, el, marks, pads, ports, bezel, drawn: NaN };
  });

  const sp = spring(gap);
  let pick = -1;

  function drawPart(p, z0) {
    if (z0 === p.drawn) return;
    p.drawn = z0;
    const z1 = z0 + p.L.h;
    put(p.el, prism(P, front, p.ring, p.inner, z0, z1));
    for (const m of p.marks) m.el.setAttribute("d", poly(onFace(m.ring, m.face, z0)));
    for (const q of p.pads) put(q.el, prism(P, front, q.pr, q.pi, z1, z1 + 2.2));
    for (const d of p.ports) place(d.el, P(d.u, d.v, z1));
    if (p.bezel) p.bezel.el.setAttribute("d", poly(ringAt(P, p.bezel.ring, z1)));
  }

  const B = register(stage, (dt) => {
    const m = stepS(sp, dt);
    const zs = zAt(sp.x);
    parts.forEach((p, i) => drawPart(p, zs[i]));
    return m;
  });
  bag.add(B.unregister);

  function choose(i) {
    pick = i;
    parts.forEach((p, k) => p.el.sil.classList.toggle("hi", k === i));
    parts[3].bezel.el.classList.toggle("hi", i < 0 || i === 3);
    read.textContent = i < 0 ? "rest" : LAYERS[i].name;
  }

  // The pick reads the target pose: the gap's target depends only on x, so a
  // layer moving under a still pointer can't change which one is picked.
  function hit([x, y]) {
    const zs = zAt(sp.t);
    let best = -1, bd = Infinity;
    parts.forEach((p, i) => {
      const cy = P(p.L.dx, p.L.dx, zs[i] + p.L.h)[1];
      const d = Math.abs(y - cy);
      if (d < bd) { bd = d; best = i; }
    });
    const cx = P(0, 0, 0)[0];
    return Math.abs(x - cx) < 120 && bd < 40 ? best : -1;
  }

  bag.add(pointer(stage, {
    move: (p) => {
      const u = clamp((p[0] - 90) / 220, 0, 1);
      sp.t = gap * (0.35 + u * (SPREAD - 0.35));
      choose(hit(p));
      B.wake();
    },
    leave: () => { sp.t = gap; choose(-1); B.wake(); },
  }));
  bag.add(() => svg.replaceChildren());
  choose(-1);

  return {
    set: (v) => { gap = v; if (pick < 0) { sp.t = gap; B.wake(); } },
    destroy: bag.dispose,
  };
}

hairline({
  name: "stack",
  means: "A product pulled apart into its layers: move across to open the stack, up and down to pick a layer.",
  rules: [1, 5, 8, 9],
  range: [6, 11, 16],
  tour: [[150, 150], [240, 110], [300, 210], null],
  mount,
});
