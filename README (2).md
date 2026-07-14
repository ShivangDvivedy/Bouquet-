# For Sushi ❤️ — the website surprise

This is the site your QR code should point to. It mirrors the bouquet itself:
open an envelope → flip through the flower tags → unfold the hidden notes →
read the main letter → arrive at the final message.

## How to host it on GitHub Pages (free, takes ~2 minutes)

1. Create a new **public** repository on GitHub (e.g. `for-sushi`).
2. Upload these three files to the root of the repo:
   - `index.html`
   - `style.css`
   - `script.js`
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. GitHub will give you a live link that looks like:
   `https://yourusername.github.io/for-sushi/`
6. Wait a minute or two for it to go live, then generate a QR code for that
   exact URL (e.g. at qr-code-generator.com) and print it into your
   "Open Me Last" envelope.

## Customizing before you send it

- **Photos**: open `index.html`, find the `#polaroids` section, and replace
  each `<div class="polaroid-photo placeholder">...</div>` with:
  ```html
  <img class="polaroid-photo" src="photo1.jpg" alt="">
  ```
  Upload `photo1.jpg` etc. into the same repo folder.
- **Text**: every line of copy (flower tags, hidden notes, the letter) lives
  in plain sight in `index.html` and `script.js` — search for the line you
  want to change and edit it directly.
- **Colors**: all colors are defined once at the top of `style.css` under
  `:root { ... }` — change `--rose`, `--gold`, etc. if you want a different
  palette.
- **Sound**: if you want to add music, drop an mp3 into the repo and add
  an `<audio>` tag with `autoplay` — most browsers block autoplay with sound
  until the user interacts, which actually works in your favor here since
  the envelope tap counts as that interaction.

## A note on testing

Open `index.html` directly in your browser first to check everything reads
right before you print the QR code — much easier to fix a typo now than
after she's holding the bouquet.
