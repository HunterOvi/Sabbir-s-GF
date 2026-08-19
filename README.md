# 🌙 Happy Birthday, Tahmina

An interactive, animated birthday page built as a scrolling one-page experience — a night sky, a constellation that spells her name, poppable balloons, a candle to blow out, flip cards, a gift box that opens into a letter, and a fireworks finale.

**[Live demo →](#)** *(enable GitHub Pages — see below — and put the link here)*

## ✨ What's inside

| Section | What happens |
|---|---|
| Hero | Animated night sky (canvas starfield) with a typewriter title |
| Constellation | Tap stars in order to spell out **TAHMINA** |
| Balloons | 8 floating balloons — pop them for little confetti bursts |
| Candle | Click to "blow out" the candle and make a wish |
| Reasons | Flip cards revealing reasons, one at a time |
| Gift | A box that opens into a hand-typed love letter |
| Finale | Click to set off fireworks over the night sky |

Built with plain **HTML, CSS, and vanilla JavaScript** — no build step, no dependencies, nothing to install.

## 🚀 Running it locally

Clone the repo and just open the file:

```bash
git clone https://github.com/<your-username>/tahmina-birthday.git
cd tahmina-birthday
open index.html      # macOS
# or double-click index.html in your file explorer
```

Or serve it locally (recommended, avoids any browser file:// restrictions):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Publishing with GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — your page will be live at `https://<your-username>.github.io/tahmina-birthday/` within a minute or two.

## 🎨 Making it your own

Everything lives in three files:

```
tahmina-birthday/
├── index.html      # structure & content (section text, reasons, letter)
├── css/style.css   # all styling — colors, layout, animation timing
└── js/main.js      # all interactivity
```

- **Change the name:** edit `const name = 'TAHMINA';` in `js/main.js` (constellation section) and the `Tahmina` string in the hero typewriter, plus every mention in `index.html`.
- **Change the colors:** everything is driven by CSS variables at the top of `css/style.css` (`--gold`, `--rose`, `--night-deep`, etc.) — change those and the whole palette follows.
- **Change the letter:** edit the `message` string inside the `gift()` function in `js/main.js`.
- **Change the reasons:** edit the `reasons` array in `js/main.js`.
- **Fonts:** swap the Google Fonts link in `index.html` and the `--serif` / `--script` / `--sans` variables in `style.css`.

## ♿ Notes

- Respects `prefers-reduced-motion` — animations are disabled for users who request it.
- Fully responsive down to small phone widths.
- No tracking, no external requests besides Google Fonts.

---

Made with love, for Tahmina. 💛
