# Built to Move — 20 s promo

One composition (`comp.html`) renders both cuts: landscape 1920×1080 and portrait 1080×1920 (`?portrait`).
Every frame is a pure function of time (`window.__seek(t)`); 20.0 s at 30 fps = 600 frames.

## Files

| file | what |
|---|---|
| `comp.html` | the film: three.js stack (navy, copper edges, gold spark), Keniya / TurnFlow / AI panels in CSS 3D, end card |
| `score.py` | the sound: pulse, interface sounds, voice ducking; writes `sfx.wav` (the mix) and `vo_track.wav` |
| `vo/` | `lines.txt`, `gen.py` (VoiceStudio, profile "Sean 6 take4", seed 7, position_temperature 0), `t1–t6.wav` |
| `img/`, `screen-img.js` | Keniya box photos from `~/Keneya/public/images`; the stack's screen uses an inlined copy (file:// images can't go into WebGL) |
| `faces.css`, `fonts/` | Cabinet Grotesk, Satoshi (Fontshare), Bricolage Grotesque, Figtree (Google Fonts, OFL), inlined |
| `three.bundle.js`, `rounded-box.js` | three.js 0.186 from this repo's node_modules, as a classic script |
| `out/` | renders, captions (`.srt`, `.vtt`), posters |

## Build

```bash
cd design/video/built-to-move
python3 vo/gen.py                     # needs VoiceStudio open (API on localhost:3900); only to regenerate the voice
python3 score.py                      # → sfx.wav
R=~/.claude/skills/onetake/scripts/render.py
python3 $R comp.html --out out/landscape.mp4 --sfx sfx.wav --samples-max 32 --gap 16
python3 $R "comp.html?portrait" --width 1080 --height 1920 --out out/portrait.mp4 --sfx sfx.wav --samples-max 32 --gap 16
python3 $R comp.html --out out/master-4k.mp4 --sfx sfx.wav --scale 2 --fps 30      # 3840×2160, 600 frames
python3 ~/.claude/skills/onetake/scripts/verify_promo.py out/landscape.mp4 --comp comp.html
```

Preview live: open `comp.html?play` (or `?t=11.5&hud` for one frame).

## Sample indications

The TurnFlow job screen and the AI workflow are reconstructions with fictional data and say so on screen
("Sample · reconstructed screen", "Fictional business · sample"). TurnFlow's real status wording was not available
locally; "In progress", "Owner review" and "Submitted" are stand-ins to confirm against the app.
