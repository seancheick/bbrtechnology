/**
 * Devices: a phone, a tablet and a monitor on one shelf, the screens a studio
 * ships to. At rest they lean back at different angles and the tablet's edge
 * is lit. The device under the pointer swings upright and lifts; the others
 * lean away, staggered by their distance from it. The slider is the stagger.
 *
 * The pattern: one of many. Tweens, a stagger by distance, and a pick on the
 * rest centres along the row, which never move.
 */
const {
  Cam, fillet, fit, poly, prism, proj, rad, rings, seg, facing,
  disposer, mk, place, pointer, put, register, solid, tdone, tset, tval, tween, flatDot,
} = HL;

const SHELF = [-10, -16, 190, 16];
const DEV = [
  { name: "phone", x: 0, w: 28, h: 56, t: 3, inset: 2.6, chin: 2.6, r: 6, rest: -16, lean: -24, cam: true },
  { name: "tablet", x: 40, w: 50, h: 66, t: 3, inset: 4, chin: 4, r: 6, rest: -9, lean: -22, cam: true },
  { name: "monitor", x: 102, w: 82, h: 54, t: 4, inset: 3, chin: 8, r: 4, rest: -4, lean: -13, stand: 16 },
];
const LIFT = 7;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;
  const C = Cam(45, 0.5, 1.5);
  fit(C, [[SHELF[0], SHELF[1], -6], [SHELF[2], SHELF[3], -6], [SHELF[2], SHELF[1], 0], [SHELF[0], SHELF[3], 0],
    [0, -14, 70], [184, -6, 85]], 200, 172);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [sr, si] = rings(...SHELF, 7, 2);
  put(solid(g), prism(P, front, sr, si, -6, 0));

  const devs = DEV.map((d) => {
    const grp = mk("g", {}, g);
    let neck = null;
    if (d.stand) {
      const cx = d.x + d.w / 2;
      const [fr, fi] = rings(cx - 18, -9, cx + 18, 9, 5, 1.4);
      put(solid(grp), prism(P, front, fr, fi, 0, 2.5));
      const [nr, ni] = rings(cx - 4, -3, cx + 4, 3, 2, 0.8);
      neck = solid(grp);
      put(neck, prism(P, front, nr, ni, 2.5, d.stand));
    }
    const shape = fillet([[0, 0], [d.w, 0], [d.w, d.h], [0, d.h]], [d.r, d.r, d.r, d.r], 5);
    const scr = fillet(
      [[d.inset, d.chin], [d.w - d.inset, d.chin], [d.w - d.inset, d.h - d.inset], [d.inset, d.h - d.inset]],
      [d.r * 0.5, d.r * 0.5, d.r * 0.5, d.r * 0.5], 4,
    );
    const back = mk("path", { class: "lo" }, grp), face = mk("path", { class: "sil" }, grp);
    const screen = mk("path", { class: "nf lo" }, grp), lip = mk("path", { class: "nf lo" }, grp);
    const dot = d.cam ? flatDot(grp, C, 0.9, "dot m") : null;
    return { ...d, shape, scr, back, face, screen, lip, dot, neck, a: tween(d.rest), z: tween(0), drawn: "" };
  });

  function draw(d, th, lift) {
    const key = th.toFixed(3) + "," + lift.toFixed(3);
    if (key === d.drawn) return;
    d.drawn = key;
    const zb = d.stand || 0.4, s = Math.sin(rad(th)), c = Math.cos(rad(th));
    const w = (u, v) => P(d.x + u, v * s, zb + v * c + lift);
    const wb = (u, v) => P(d.x + u, v * s - d.t * c, zb + v * c + d.t * s + lift);
    d.back.setAttribute("d", poly(d.shape.map((p) => wb(p[0], p[1]))));
    d.face.setAttribute("d", poly(d.shape.map((p) => w(p[0], p[1]))));
    d.screen.setAttribute("d", poly(d.scr.map((p) => w(p[0], p[1]))));
    d.lip.setAttribute("d", seg(w(d.r, 0), wb(d.r, 0)) + seg(w(d.w - d.r, 0), wb(d.w - d.r, 0)));
    if (d.dot) place(d.dot, w(d.w / 2, d.h - d.inset / 2 - 0.4));
  }

  const B = register(stage, (_dt, now) => {
    let m = false;
    for (const d of devs) { draw(d, tval(d.a, now), tval(d.z, now)); if (!tdone(d.a, now) || !tdone(d.z, now)) m = true; }
    return m;
  });
  bag.add(B.unregister);

  const lit = 1;
  let act = -2;
  function choose(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    devs.forEach((d, i) => {
      const delay = Math.abs(i - from) * stag;
      tset(d.a, a < 0 ? d.rest : i === a ? 0 : d.lean, now, delay);
      tset(d.z, i === a ? LIFT : 0, now, delay);
      const on = a < 0 ? i === lit : i === a;
      d.face.classList.toggle("hi", on);
      d.screen.classList.toggle("lo", !on);
    });
    read.textContent = a < 0 ? "rest" : devs[a].name;
    B.wake();
  }

  // the rest centres along the row never move: pick the nearest in screen x
  const centres = devs.map((d) => P(d.x + d.w / 2, 0, (d.stand || 0) + d.h / 2));
  function hit([x, y]) {
    let best = -1, bd = Infinity;
    centres.forEach((p, i) => { const dd = Math.abs(x - p[0]); if (dd < bd) { bd = dd; best = i; } });
    const p = centres[best];
    return bd < 46 && Math.abs(y - p[1]) < 70 ? best : -1;
  }

  choose(-1);
  bag.add(pointer(stage, { move: (p) => choose(hit(p)), leave: () => choose(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { stag = v; }, destroy: bag.dispose };
}

hairline({
  name: "devices",
  means: "A phone, a tablet and a monitor on a shelf: the one under the pointer swings upright, the others lean away.",
  rules: [1, 2, 5, 8],
  range: [0, 60, 120],
  tour: [[120, 150], [190, 160], [285, 175], null],
  mount,
});
