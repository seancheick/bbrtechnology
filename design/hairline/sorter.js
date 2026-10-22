/**
 * Sorter: a pigeonhole rack, three rows of four, where incoming letters are
 * routed. Some slots hold an envelope sticking out by a different amount;
 * some are empty. The slot under the pointer pulls its letter out (or takes
 * one in, if it was empty), and the others settle back, staggered by their
 * distance from it. At rest the longest letter is lit. The slider is the
 * stagger, in ms.
 *
 * The pattern: one of many. Tweens, a stagger by grid distance, and a hit test
 * on the rack's face, which never moves.
 */
const {
  Cam, fit, open, poly, prism, proj, rings, rrect, seg, facing,
  disposer, mk, pointer, put, register, solid, tdone, tset, tval, tween,
} = HL;

const COLS = 4, ROWS = 3, CW = 23, RH = 19, FR = 6, D = 24;
const W = FR * 2 + COLS * CW - 4, H = FR * 2 + ROWS * RH - 4, OUT = 28;
// how far each letter sticks out at rest, row by row from the bottom; 0 is an empty slot
const REST = [
  [9, 0, 14, 6],
  [4, 19, 0, 11],
  [12, 7, 3, 0],
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;
  const C = Cam(45, 0.5, 2.15);
  fit(C, [[0, 0, 0], [W, D + OUT, 0], [W, 0, H + 4], [0, D + OUT, 0], [0, 0, H + 4], [W, D, 0]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [br, bi] = rings(0, 0, W, D, 4, 1.4);
  put(solid(g), prism(P, front, br, bi, 0, H));
  const [cr, ci] = rings(-2, -2, W + 2, D + 2, 4.5, 1.4);
  put(solid(g), prism(P, front, cr, ci, H, H + 4));
  // the plinth's shadow line along the front, and the face's openings
  mk("path", { d: open([P(3, D, 3), P(W - 3, D, 3)]), class: "nf lo" }, g);
  const onFace = (ring) => ring.map((q) => P(q.u, D, q.v));

  const slots = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const x0 = FR + c * CW, z0 = FR + r * RH;
    mk("path", { d: poly(onFace(rrect(x0, z0, x0 + CW - 4, z0 + RH - 4, 2.4, 4))), class: "nf lo" }, g);
    slots.push({ r, c, x0, z0, rest: REST[r][c] });
  }
  // letters, bottom row first and left to right, so nearer and higher ones paint last
  for (const s of slots) {
    const grp = mk("g", {}, g);
    s.el = solid(grp);
    s.flap = mk("path", { class: "nf lo" }, grp);
    s.tw = tween(s.rest);
    s.drawn = NaN;
    s.cx = P(s.x0 + (CW - 4) / 2, D, s.z0 + (RH - 4) / 2);
  }
  const lit = slots.reduce((a, b) => (b.rest > a.rest ? b : a));

  function draw(s, out) {
    if (out === s.drawn) return;
    s.drawn = out;
    if (out < 0.6) {
      put(s.el, { sil: "", crease: "" });
      s.flap.setAttribute("d", "");
      return;
    }
    const x0 = s.x0 + 2, x1 = s.x0 + CW - 6, z = s.z0 + 0.4, y1 = D + out;
    const [ring, inner] = rings(x0, D, x1, y1, 1.2, 0.5);
    put(s.el, prism(P, front, ring, inner, z, z + 1.6));
    const xm = (x0 + x1) / 2, fy = D + Math.min(out, (x1 - x0) * 0.42);
    s.flap.setAttribute("d", seg(P(x0 + 1, D, z + 1.6), P(xm, fy, z + 1.6)) + seg(P(xm, fy, z + 1.6), P(x1 - 1, D, z + 1.6)));
  }

  const B = register(stage, (_dt, now) => {
    let m = false;
    for (const s of slots) { draw(s, tval(s.tw, now)); if (!tdone(s.tw, now)) m = true; }
    return m;
  });
  bag.add(B.unregister);

  let act = null;
  function choose(a) {
    if (a === act) return;
    const now = performance.now(), from = a || act;
    act = a;
    for (const s of slots) {
      const dist = Math.abs(s.r - from.r) + Math.abs(s.c - from.c);
      const to = !a ? s.rest : s === a ? OUT : s.rest * 0.45;
      tset(s.tw, to, now, dist * stag);
      s.el.sil.classList.toggle("hi", a ? s === a : s === lit);
    }
    read.textContent = a ? `slot ${a.c + 1}·${ROWS - a.r}` : "rest";
    B.wake();
  }

  // the face never moves: pick the opening whose centre is nearest the pointer
  function hit([x, y]) {
    let best = null, bd = 22;
    for (const s of slots) {
      const d = Math.hypot(x - s.cx[0], (y - s.cx[1]) * 1.2);
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  }

  for (const s of slots) s.el.sil.classList.toggle("hi", s === lit);
  bag.add(pointer(stage, { move: (p) => choose(hit(p)), leave: () => choose(null) }));
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { stag = v; }, destroy: bag.dispose };
}

hairline({
  name: "sorter",
  means: "A pigeonhole rack routing letters: the slot under the pointer pulls its letter out and the rest settle back.",
  rules: [1, 2, 5, 8],
  range: [0, 45, 90],
  tour: [[150, 190], [215, 150], [262, 120], null],
  mount,
});
