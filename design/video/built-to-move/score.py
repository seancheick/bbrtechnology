#!/usr/bin/env python3
"""Built to Move — the score. Picture times (T) and VO starts come from comp.html through Playwright, so a retimed
beat takes its sound with it. Three buses: a restrained pulse (sub + tactile ticks, a pad only where the script
asks for the fullest point and the brand chord), interface sounds in one room, and the voice (Sean 6 take4) on top
with the music ducked under it. Rests stay quiet: verify_promo.py wants >= 15 % of the track under -40 dB.
python3 score.py → sfx.wav (48 kHz stereo) and vo_track.wav"""
import asyncio, json, os, pathlib, sys, wave
sys.path.insert(0, os.path.expanduser("~/.claude/skills/onetake/scripts"))
from sfx_palette import Score, air, glass, wood, sub, bubble, SR, lp, hp
from playwright.async_api import async_playwright
import numpy as np
from scipy import signal

HERE = pathlib.Path(__file__).resolve().parent
DUR = 20.0


async def load():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={"width": 1920, "height": 1080})
        await pg.goto("file://" + str(HERE / "comp.html")); await pg.evaluate("window.__ready")
        r = json.loads(await pg.evaluate("JSON.stringify({T,VO})")); await b.close(); return r["T"], r["VO"]

T, VO = asyncio.run(load())
rng = np.random.default_rng(3)
s = Score(dur=DUR, T60=0.85); place = s.place
click = lambda t, g=0.3, pan=0.0: (place(wood(250, 0.07), t, g, pan, 0.18), place(wood(195, 0.06), t + 0.06, g * 0.7, pan, 0.18))
t_ = lambda n: np.arange(n) / SR


def pad(freqs, dur, attack=0.6, release=1.2, bright=1800):
    n = int(SR * dur); t = t_(n); x = np.zeros(n)
    for f in freqs:
        for det in (-0.004, 0.0, 0.005):                       # three slightly detuned voices per note
            ph = rng.uniform(0, 6.28)
            x += sum(np.sin(2 * np.pi * f * (1 + det) * k * t + ph) / k ** 1.6 for k in (1, 2, 3, 4))
    env = np.minimum(1, t / attack) * np.minimum(1, (dur - t) / release).clip(0)
    return lp(x * env, bright) / (len(freqs) * 3)


def tick(dur=0.03):                                            # a dry, tactile tick (filtered noise)
    n = int(SR * dur); x = rng.standard_normal(n) * np.exp(-t_(n) * 160)
    return hp(lp(x, 7000), 1800) * 0.6


hz = lambda m: 440 * 2 ** ((m - 69) / 12)

# ── music: a pulse that builds to the AI beat, eases back, and resolves on the brand chord ──
beat = 60 / 96
pulse = [round(0.15 + beat * k, 3) for k in range(int((14.0 - 0.15) / beat) + 1)]
for k, tb in enumerate(pulse):
    if tb < 2.1 and k % 2: continue                            # half-time under the opening
    g = 0.16 if tb < 6 else 0.2 if tb < 10 else 0.26           # the rhythm reaches its fullest at 10–14
    place(sub(54, 0.32 if tb >= 10 else 0.24), tb, g, 0.0, 0.12)
    if tb >= 10 or (tb >= 2.2 and k % 2 == 0): place(tick(), tb + beat / 2, 0.05 if tb < 10 else 0.08, 0.25 * (-1) ** k, 0.08)   # ticks thin out until the fullest point
for tb in (14.0 + beat * 2 * k for k in range(4)):              # 14–17: the pulse eases back to every other beat
    if tb < 16.9: place(sub(50, 0.4), tb, 0.13, 0.0, 0.15)
place(pad([hz(55), hz(62), hz(65), hz(69)], 4.2, attack=0.9, release=1.4), 10.0, 0.42, 0.0, 0.5)     # Gm9 under the AI beat
place(pad([hz(46), hz(58), hz(62), hz(65)], 2.4, attack=0.8, release=1.0, bright=1400), 14.1, 0.32, 0.0, 0.6)  # the lift
place(pad([hz(41), hz(53), hz(57), hz(60), hz(67)], 2.25, attack=0.06, release=1.7, bright=2600), 17.0, 0.6, 0.0, 0.7)  # brand chord, F add9
place(glass(hz(81), 1.9, 0.4), 17.02, 0.1, 0.0, 0.7); place(sub(41, 1.3), 17.0, 0.4, 0.0, 0.4)

# ── interface sounds in the same room ──
place(sub(42, 1.2), T["spark"][0], 0.5, 0.0, 0.4)                                     # the rounded impact
place(glass(1760, 0.9, 1.2), T["spark"][0] + 0.02, 0.12, 0.3, 0.5)                     # the ignition
place(air(T["spark"][1] - T["spark"][0], 3000, 6500, 2.2, 0.2), T["spark"][0], 0.12, 0.4, 0.4, pan_to=-0.4)   # the spark runs the edge
place(air(0.8, 220, 2600, 1.2, 0.45), T["dive"][0] - 0.1, 0.34, 0.0, 0.5)               # into the screen
click(T["pick"], 0.3, 0.1)
for (t0, t1), d in ((T["slab1"], -1), (T["slab2"], 1)):                                 # the slabs pass the lens
    place(air(t1 - t0 + 0.1, 180, 2400, 1.1, 0.4), t0, 0.45, -0.5 * d, 0.4, pan_to=0.5 * d)
    place(sub(60, 0.5), (t0 + t1) / 2, 0.2, 0.0, 0.2)
for i in range(4): place(tick(0.02), T["tfCheck"][0] + i * 0.15, 0.07, 0.2, 0.15)
click(T["tfPress"], 0.32, 0.2)                                                          # the submission cue
place(glass(hz(76), 0.9, 0.7), T["tfRev"], 0.14, 0.2, 0.45); place(glass(hz(83), 0.9, 0.6), T["tfRev"] + 0.04, 0.09, 0.2, 0.45)
place(sub(70, 0.25), T["tfRev"], 0.2, 0.0, 0.2)                                          # percussion accent on "Owner review"
place(bubble(620, 0.2), T["aiMsg"], 0.16, -0.2, 0.3)                                     # incoming message tick
place(air(T["wire"][1] - T["wire"][0], 900, 4200, 2.0, 0.3), T["wire"][0], 0.1, -0.2, 0.3, pan_to=0.3)
place(glass(hz(79), 1.1, 0.6), T["aiReady"], 0.15, 0.25, 0.5); place(glass(hz(86), 1.1, 0.5), T["aiReady"] + 0.05, 0.1, 0.25, 0.5)   # the response cue
place(air(1.4, 200, 1800, 1.0, 0.6), T["fold"][0] + 0.2, 0.26, 0.0, 0.6)                # the harmonic lift / crane back
for i in range(4): place(wood(120 - i * 8, 0.12), T["seat"][0] + i * 0.22 + 0.12, 0.2, 0.0, 0.2)   # layers seat
sfx = s.mix(peak_db=-8.0)                                       # stereo, room applied

# ── the voice ──
vo = np.zeros((len(sfx), 2)); env = np.zeros(len(sfx))
for i, (t0, text) in enumerate(VO, 1):
    with wave.open(str(HERE / "vo" / f"t{i}.wav")) as w:
        sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16) / 32768.0
    x = signal.resample_poly(x, SR, sr); x = hp(x, 70)
    a = int(t0 * SR); n = min(len(x), len(vo) - a)
    vo[a:a + n, 0] += x[:n]; vo[a:a + n, 1] += x[:n]; env[a:a + n] = 1
# duck the music/sfx bed under the voice (attack 60 ms, release 250 ms)
k = np.exp(-1 / (0.06 * SR)); r = np.exp(-1 / (0.25 * SR)); d = np.zeros_like(env); y = 0.0
for j, e in enumerate(env):
    y = (k if e > y else r) * y + (1 - (k if e > y else r)) * e; d[j] = y
bed = sfx * (1 - 0.45 * d)[:, None]
vo_rms = np.sqrt(np.mean(vo[env > 0] ** 2)); bed_rms = np.sqrt(np.mean(bed[env > 0] ** 2))
vo *= (bed_rms * 10 ** (9 / 20)) / (vo_rms + 1e-9)            # voice sits ~9 dB over the bed where it speaks
m = bed + vo
m = m / np.abs(m).max() * 10 ** (-4.0 / 20)                    # sample peak -4 dBFS: the AAC stays under verify's -3
fr = int(SR / 12); rms = np.array([np.sqrt(np.mean(m[i:i + fr] ** 2)) for i in range(0, len(m) - fr, fr)])
print(f"quiet {(20 * np.log10(rms + 1e-9) < -40).mean():.3f}  voice over bed {20 * np.log10(np.sqrt(np.mean(vo[env > 0] ** 2)) / bed_rms):.1f} dB")
for name, x in (("sfx.wav", m), ("vo_track.wav", vo / np.abs(m).max() * 10 ** (-4.0 / 20))):
    with wave.open(str(HERE / name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
print("wrote", HERE / "sfx.wav")
