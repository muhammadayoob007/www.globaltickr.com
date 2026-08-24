# NEXUS Markets (globaltickr.com) — Deploy Guide

Everything in the **`site/`** folder is your website, ready to upload. Nothing needs building.

```
site/
├── index.html        ← the live dashboard (your homepage)
├── insights.html     ← original market guides (helps AdSense approval)
├── about.html
├── privacy.html      ← AdSense-compliant privacy + cookie policy
├── terms.html
├── disclaimer.html
├── contact.html
├── ads.txt           ← required by AdSense (put your pub-ID in it)
├── robots.txt
└── sitemap.xml
```

---

## STEP 1 — Put the files on GitHub
1. Go to https://github.com/muhammadayoob007 → **New repository** → name it e.g. `globaltickr` → Create.
2. Click **“uploading an existing file”** and drag in **everything inside the `site/` folder** (not the folder itself — the files must be at the repo root, so `index.html` is at the top level).
3. Commit.

## STEP 2 — Deploy on Vercel
1. Go to https://vercel.com/muhammad-02bd → **Add New → Project**.
2. **Import** the `globaltickr` repo. No build settings needed (it’s static) → **Deploy**.
3. In ~30 seconds you get a live `…vercel.app` URL. Open it — the live feeds now work (no more “connecting…”, because it’s served over https).

## STEP 3 — Connect your domain
1. Vercel → your project → **Settings → Domains** → add `globaltickr.com` and `www.globaltickr.com`.
2. Vercel shows you DNS records. Add them at your domain registrar (or point the nameservers to Vercel).
3. Wait for it to go green — HTTPS is automatic and free.

---

## STEP 4 — Apply for Google AdSense
AdSense reviews the **live domain**, so do this only after Steps 1–3.

1. Sign up / sign in at https://adsense.google.com and add the site `globaltickr.com`.
2. AdSense gives you a **publisher ID** that looks like `ca-pub-1234567890123456`. Now do the find-and-replace below.
3. Submit for review (can take a few days to ~2 weeks).

### What to replace before/after approval
Search these placeholders across **all** the `.html` files and in `ads.txt`:

| Placeholder | Replace with | Where |
|---|---|---|
| `ca-pub-XXXXXXXXXXXXXXXX` | your real publisher ID | every `.html` (3 in index.html, 1 per page) + `ads.txt` |
| `data-ad-slot="0000000000"` | your real ad-unit slot IDs | index.html (2 ad units) |
| `pub-XXXXXXXXXXXXXXXX` | your publisher ID (no `ca-` prefix) | `ads.txt` only |

After editing, commit to GitHub again — Vercel auto-redeploys.

> **Tip:** You can deploy and go live *before* AdSense approval. The placeholder ad code just shows nothing until your real IDs are in — it won’t break the site.

---

## OPTIONAL — turn on real-time forex + full AI chat
Both are off by default and work without them. To enable, open `index.html` and paste a key:

- **Real-time streaming forex + metals** — get a free key at https://twelvedata.com (no card) and put it in:
  `const TWELVEDATA_KEY='';`
- **Open-ended AI assistant** — paste an OpenAI key in `const OPENAI_KEY='';`
  ⚠️ A key placed in the page is visible to visitors. Fine for testing; for a public site route it through a small backend instead. The built-in assistant (live prices, conversions, sessions, news) already works with **no** key.

---

## AdSense approval tips
- The **Insights** page gives you original written content — good, keep building on it (add a new short article now and then).
- Make sure Privacy, Terms, Disclaimer and Contact are all reachable from the footer (they are).
- Don’t click your own ads — ever. It gets accounts banned.
- Have a little patience; data/tool sites sometimes need one resubmission.
```
