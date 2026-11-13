import numpy as np, sys
from PIL import Image, ImageFilter
rng = np.random.default_rng(7)
W, H = 1800, 1380
def ss(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t)
def noise(seed, sigmas=(90, 45, 22, 11, 5)):
    r = np.random.default_rng(seed); out = np.zeros((H, W), np.float32); amp = 1.0
    for s in sigmas:
        g = (r.random((H, W)) * 255).astype(np.uint8)
        b = np.asarray(Image.fromarray(g).filter(ImageFilter.GaussianBlur(s)), np.float32)
        b = (b - b.mean()) / (b.std() + 1e-6); out += b * amp; amp *= 0.55
    return out / 2.0   # roughly unit-ish variance
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
v = yy / H
top = np.array([128, 234, 255], np.float32); mid = np.array([168, 240, 255], np.float32); bot = np.array([203, 247, 253], np.float32)
t1 = ss(0.0, 0.6, v)[..., None]; t2 = ss(0.5, 1.0, v)[..., None]
sky = top * (1 - t1) + mid * t1; sky = sky * (1 - t2) + bot * t2
D = np.zeros((H, W), np.float32)
def puff(cx, cy, r, w=1.0):
    global D
    x0, x1 = int(max(0, cx - 3 * r)), int(min(W, cx + 3 * r)); y0, y1 = int(max(0, cy - 3 * r)), int(min(H, cy + 3 * r))
    if x1 <= x0 or y1 <= y0: return
    sx = xx[y0:y1, x0:x1] - cx; sy = yy[y0:y1, x0:x1] - cy
    D[y0:y1, x0:x1] += w * np.exp(-(sx * sx + sy * sy) / (2 * (r * 0.8) ** 2))
def cumulus(cx, base, width, height, n, seed):
    r = np.random.default_rng(seed)
    for i in range(n):
        t = r.uniform(-1, 1); px = cx + t * width / 2
        hmax = height * (1 - abs(t) ** 1.7)            # dome profile, flat base
        py = base - r.uniform(0.05, 1) * hmax
        rad = r.uniform(0.10, 0.22) * height * (0.6 + 0.6 * (1 - abs(t)))
        puff(px, py, rad, r.uniform(0.5, 0.9))
cumulus(1440, 760, 620, 640, 80, 1)     # the big tower, centre right, peak near the top
cumulus(1730, 800, 300, 330, 30, 2)     # shoulder running off the right edge
cumulus(900, 740, 460, 330, 46, 4)      # second head, left of centre
cumulus(1160, 880, 640, 150, 36, 7)     # low shelf joining the two
cumulus(300, 1060, 560, 230, 50, 5)     # bank along the lower left
cumulus(360, 240, 330, 140, 44, 3)      # small cloud, top left
cumulus(520, 610, 170, 50, 14, 6)       # wisp, mid left
cumulus(1570, 1130, 130, 50, 10, 8)     # wisp, lower right
n = noise(3); n2 = noise(9, (30, 14, 7, 3))
d = D + 0.45 * n + 0.16 * n2
cloud = ss(0.75, 2.3, d)
haze = ss(0.52, 0.98, v) * np.clip(0.55 + 0.30 * noise(21, (120, 60, 30)), 0, 1)
alpha = np.clip(1 - (1 - cloud * 0.97) * (1 - haze * 0.9), 0, 1)
# light from above: compare density with a copy shifted down -> bright tops, cool undersides
db = np.asarray(Image.fromarray(np.clip(d * 40 + 60, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(26)), np.float32) / 40
lit = ss(-0.5, 0.6, db - np.roll(db, 70, axis=0))
white = np.array([255, 255, 255], np.float32); cool = np.array([206, 244, 253], np.float32)
ccol = cool + (white - cool) * (0.5 + 0.5 * lit)[..., None]
img = sky * (1 - alpha[..., None]) + ccol * alpha[..., None]
im = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6))
arr = np.asarray(im, np.float32) + rng.normal(0, 1.1, (H, W, 1)); im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
im.save(sys.argv[1], 'WEBP', quality=84, method=6); im.resize((900, 690)).save(sys.argv[2], 'PNG')
