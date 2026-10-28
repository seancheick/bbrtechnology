#!/usr/bin/env python3
"""B&Br launch v2 — the score. Times come from the comp's own T table (read through Playwright), so a retimed
beat takes its sound with it. One room, five materials: words and the stack are glass, clicks are wood, the
dive and the whips are air, landings are sub. The rests stay silent.   python3 score.py → sfx.wav"""
import asyncio, json, os, pathlib, sys
sys.path.insert(0, os.path.expanduser("~/.claude/skills/onetake/scripts"))
from sfx_palette import Score, air, glass, wood, sub, bubble
from playwright.async_api import async_playwright
import numpy as np

HERE = pathlib.Path(__file__).resolve().parent


async def load_T():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        await pg.goto("file://" + str(HERE / "comp.html")); await pg.evaluate("window.__ready")
        T = await pg.evaluate("JSON.stringify(T)"); await b.close(); return json.loads(T)

T = asyncio.run(load_T())
rng = np.random.default_rng(5)
s = Score(dur=24.0, T60=1.2); place = s.place
click = lambda t, g=0.3, pan=0.0: (place(wood(250, 0.07), t, g, pan, 0.2), place(wood(195, 0.06), t + 0.06, g * 0.7, pan, 0.2))

# 1 · headline: soft glass touches on the first word of each line, a low bloom under "hours back."
place(glass(523, 0.9, 0.5), T["w1"][0], 0.13, -0.1, 0.45)
place(glass(659, 0.9, 0.5), T["w2"][0], 0.12, 0.1, 0.45)
place(glass(784, 1.4, 0.6), T["w2"][4], 0.16, 0.0, 0.6); place(sub(58, 0.9), T["w2"][4] + 0.02, 0.22, 0.0, 0.4)
# 2 · headline slides into the hero; the stack rises and lands
place(air(0.8, 300, 2000, 1.2, 0.5), T["hMove"][0], 0.24, 0.3, 0.55, pan_to=-0.2)
place(sub(64, 0.7), T["rise"] + 0.35, 0.3, 0.4, 0.35)
for t in T["checks"]: place(bubble(520 + rng.uniform(-30, 30), 0.18), t + 0.05, 0.07, -0.3, 0.3)
# 3 · cursor over the stack: a breath as the layers open, a glass note per hover
place(air(1.1, 200, 900, 1.0, 0.5), T["hand0"] + 0.4, 0.16, 0.4, 0.6)
for (a, b, i) in T["hover"]: place(glass((587, 659, 784, 880)[i], 0.7, 0.8), a, 0.12, 0.4, 0.4)
click(T["click"], 0.32, 0.4)
for k in range(4): place(glass((523, 659, 784, 1046)[k], 0.6, 0.9), T["click"] + k * T["run"] / 4 + 0.05, 0.12, 0.4, 0.4)
place(glass(1318, 1.2, 0.5), T["done"], 0.14, 0.4, 0.6); place(bubble(460, 0.24), T["done"] + 0.01, 0.16, 0.4, 0.3)
# 4 · the dive into the screen: one long rising breath, a felt arrival in the demo
place(air(1.0, 180, 3600, 1.2, 0.35), T["dive"][0], 0.5, 0.3, 0.55, pan_to=0.0)
place(sub(52, 1.0), T["swap"][1], 0.4, 0.0, 0.4)
# typing: soft keys, about one in three
for i in range(87):
    if rng.uniform() < 0.64: continue
    place(wood(165 + rng.uniform(-18, 18), 0.08), T["type0"] + i / T["cps"], 0.07 * rng.uniform(0.7, 1.3), -0.1, 0.15)
click(T["run2"], 0.32, -0.15)
for i, (t, f) in enumerate(zip(T["stage"], (587, 659, 784, 880, 988))):
    place(glass(f, 0.7, 0.8), t, 0.12, 0.25, 0.4); place(bubble(460 + 30 * i, 0.2), t + 0.01, 0.1, 0.25, 0.3)
# 5 · whips through the projects, a landing on each card
for i, (t0, t1) in enumerate(T["whips"]):
    place(air(t1 - t0 + 0.15, 240, 3000, 1.3, 0.4), t0 - 0.04, 0.42, -0.4, 0.5, pan_to=0.4)
    place(sub(68 - 3 * i, 0.55), t1, 0.3, 0.2, 0.3)
place(air(0.9, 2400, 260, 1.1, 0.5), T["pull"][0], 0.26, 0.0, 0.6)
# 6 · end card: one deep hit under the name, the CTA pops, the click
place(sub(46, 1.4), T["logo"] + 0.25, 0.5, 0.0, 0.45); place(glass(659, 1.6, 0.35), T["logo"] + 0.27, 0.11, 0.0, 0.7)
place(bubble(440, 0.26), T["cta"] + 0.02, 0.2, 0.0, 0.3)
click(T["ctaClick"], 0.28, 0.1)

s.write(str(HERE / "sfx.wav"))
print("wrote", HERE / "sfx.wav")
