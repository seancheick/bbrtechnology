#!/usr/bin/env python3
"""B&Br launch — the score. Times come from the comp's own T table (read through Playwright), so a retimed
beat takes its sound with it. One room, five materials: the dot is glass, presses are wood, whips are air,
landings are sub. Fewer events than beats; the rests stay silent.   python3 score.py → sfx.wav"""
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
rng = np.random.default_rng(11)
s = Score(dur=20.0, T60=1.2); place = s.place
click = lambda t, g=0.3, pan=0.0: (place(wood(250, 0.07), t, g, pan, 0.2), place(wood(195, 0.06), t + 0.06, g * 0.7, pan, 0.2))

# 1 · the dot appears and pulses; it opens into the message
place(glass(880, 1.2, 0.5), T["dotIn"], 0.16, 0.0, 0.5)
place(bubble(520, 0.24), T["pulse"], 0.22, 0.0, 0.3)
place(air(0.5, 300, 2200, 1.3, 0.4), T["open0"], 0.22, 0.0, 0.5)
# typing: soft keys, about one in three
msg_len = 92
for i in range(msg_len):
    if rng.uniform() < 0.62: continue
    place(wood(165 + rng.uniform(-18, 18), 0.08), T["type0"] + i / T["cps"], 0.07 * rng.uniform(0.7, 1.3), -0.05, 0.15)
# 2 · pull out to the card, the dot hops onto Run and presses it
place(air(0.7, 1600, 260, 1.2, 0.5), T["pull0"], 0.24, 0.0, 0.55)
click(T["run"], 0.32, -0.2)
# the dot lands on each stage: glass up a scale (the dot's own voice), a rounded pop for each card
for i, (t, f) in enumerate(zip(T["stage"], (587, 659, 784, 880, 988))):
    place(glass(f, 0.7, 0.8), t, 0.13, 0.25, 0.4); place(bubble(460 + 30 * i, 0.2), t + 0.01, 0.12, 0.25, 0.3)
# 3 · whip to TurnFlow along the line, a felt landing, the press
for (t0, t1), pans in ((T["line1"], (-0.2, 0.5)), (T["line2"], (0.4, -0.2))):
    place(air(t1 - t0 + 0.15, 220, 3200, 1.3, 0.4), t0 - 0.05, 0.5, pans[0], 0.5, pan_to=pans[1])
    place(sub(66, 0.6), t1, 0.32, pans[1], 0.3)
click(T["fix"], 0.3, 0.2)
for t in T["step"]: place(glass(1175, 0.35, 1.0), t, 0.06, 0.15, 0.3)
click(T["appr"], 0.3, 0.25)
place(glass(1318, 1.1, 0.5), T["fin"], 0.13, 0.1, 0.6); place(glass(1760, 1.1, 0.4), T["fin"] + 0.02, 0.08, 0.1, 0.6)
# 4 · PharmaGuide: the bars fill on one rising breath; the box ticks; BLOCKED lands low
place(air(0.8, 250, 1800, 1.2, 0.3), T["fill"], 0.16, 0.0, 0.4)
click(T["box"], 0.34, -0.25)
place(sub(54, 0.7), T["box"] + 0.04, 0.3, 0.0, 0.3)
# 5 · pull back, then the dot flies home and lands as the logo's dot; one deep hit under the name
place(air(1.0, 2400, 240, 1.1, 0.5), T["pull2"][0], 0.3, 0.0, 0.6)
place(air(0.9, 260, 2400, 1.3, 0.45), T["fly"][0], 0.3, 0.2, 0.55, pan_to=0.0)
place(sub(46, 1.4), T["fly"][1], 0.55, 0.0, 0.45); place(glass(659, 1.6, 0.35), T["fly"][1] + 0.01, 0.12, 0.0, 0.7)
place(bubble(440, 0.26), T["cta"] + 0.02, 0.2, 0.0, 0.3)
click(T["ctaPress"], 0.28, 0.0)

s.write(str(HERE / "sfx.wav"))
print("wrote", HERE / "sfx.wav")
