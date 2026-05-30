# Motion Assets · Dawati

> Adobe After Effects + Lottie sources for animated invitation extras.
> Sits next to the web app — neither depends on the other.

```
motion/
├── intro/
│   └── dawati-intro.jsx          AE script: builds a 7s cosmic intro comp
│                                  (cosmos → star draws on → families fade in
│                                  → date → white-out handoff).
│
├── lottie/
│   └── najmah-star.json          The 8-pointed Dawati star, spinning + glowing.
│                                  Preview on https://lottiefiles.com/preview
│                                  by dragging the file in.
│                                  Drop into the web app via lottie-web or
│                                  @lottiefiles/react-lottie-player.
│
└── batch/
    ├── batch-render.jsx          Reads a CSV of guests + drops one MP4
    │                              per row into the AE Render Queue.
    │                              Expects a comp named "Dawati_Intro" with
    │                              a text layer named "Guest Name".
    └── guests-template.csv       Starter CSV — 10 dummy Najdi names.
                                   Edit columns to match your real list.
```

## Quickstart

### 1. Intro composition
1. Open After Effects.
2. `File → Scripts → Run Script File…` → pick `intro/dawati-intro.jsx`.
3. A comp called **Dawati_Intro** appears, ready to preview / render.
4. Open the CONFIG block at the top of the .jsx to change the family
   names, occasion, and date, then re-run.

### 2. Lottie preview (no AE needed)
1. Go to https://lottiefiles.com/preview.
2. Drag `lottie/najmah-star.json` into the page.
3. You should see the star spinning + glowing.
4. To embed in the website:
   ```bash
   pnpm add @lottiefiles/react-lottie-player
   ```
   ```tsx
   import { Player } from '@lottiefiles/react-lottie-player';
   import star from '@/motion/najmah-star.json';

   <Player autoplay loop src={star} style={{ width: 200, height: 200 }} />
   ```

### 3. Batch render per guest
1. Run `intro/dawati-intro.jsx` first so the **Dawati_Intro** comp exists.
2. In that comp, rename one text layer to exactly `Guest Name`
   (or update `CONFIG.nameLayerName` in `batch-render.jsx`).
3. Save your guest list as a CSV — see `batch/guests-template.csv`.
4. Edit `CONFIG.csvPath` and `CONFIG.outputFolder` at the top of
   `batch-render.jsx`.
5. `File → Scripts → Run Script File…` → pick `batch-render.jsx`.
6. The Render Queue fills with one item per guest.
7. Hit **Render All**. MP4s land in your output folder.

## Fonts to install

Both scripts reference these — install on the AE machine before running:

- **Tajawal** (UI labels) — https://fonts.google.com/specimen/Tajawal
- **Aref Ruqaa** (family names) — https://fonts.google.com/specimen/Aref+Ruqaa

After installing, restart AE so it picks them up.

## Tier mapping

| Tier        | Get                                                         |
|-------------|-------------------------------------------------------------|
| المُمَيَّزَة  | The card only. No motion assets included.                    |
| الفاخِرَة   | Intro Lottie embedded at the top of the web card.            |
| المَلَكِيَّة  | Full AE intro video + per-guest batch-rendered MP4s on demand.|

## Color palette (matches the live card)

```
goldHi   #fff8d8
gold2    #f4d06b
gold3    #d4a93a
gold4    #b88a1e
gold5    #8a6817
inkDeep  #050714
```

Use these in any new comp you build so everything stays on-brand.

## License & redistribution

The scripts and Lottie JSON are MIT-licensed for use inside the Dawati
project. Don't redistribute as a public template — they're tuned for
our brand voice.
