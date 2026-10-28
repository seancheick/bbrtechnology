"""Generate each VO line with VoiceStudio profile 'Sean 6 take4' (e11e563e). position_temperature 0 + fixed seed
so the approved take is the one that ships (VOICE-NOTES.md: the default 5.0 is not deterministic)."""
import pathlib, sys, urllib.request, uuid
API = "http://localhost:3900/generate"; PROFILE = "e11e563e"
HERE = pathlib.Path(__file__).parent
lines = [l.strip() for l in (HERE / "lines.txt").read_text().splitlines() if l.strip()]
only = [int(x) for x in sys.argv[1].split(",")] if len(sys.argv) > 1 else range(1, len(lines) + 1)
def form(fields):
    b = uuid.uuid4().hex; out = b""
    for k, v in fields.items():
        out += f"--{b}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode()
    return out + f"--{b}--\r\n".encode(), b
for i in only:
    text = lines[i - 1]
    body, b = form({"text": text, "profile_id": PROFILE, "num_step": 16, "position_temperature": 0, "seed": 7, "language": "English"})
    req = urllib.request.Request(API, data=body, headers={"Content-Type": f"multipart/form-data; boundary={b}"})
    resp = urllib.request.urlopen(req, timeout=600); data = resp.read()
    (HERE / f"t{i}.wav").write_bytes(data)
    print(i, text, resp.headers.get("Content-Type"), len(data), flush=True)
