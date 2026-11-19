# MixReact project page

Academic project website for **MixReact: Physics-Based Reactive Humanoid Control from Multimodal Cues via a Discrete–Continuous Mixture of Transformers**.

Live site: https://binlee26.github.io/MixReact_Page/

## Local preview

This is a buildless static site. Serve the repository with any static HTTP server, for example:

```sh
python -m http.server 8000
```

Open http://localhost:8000. No package installation or build step is required.

## Editing

- `index.html`: authors, paper information, sections, and results.
- `styles.css`: responsive design and typography.
- `script.js`: viewport-aware video playback and figure enlargement.
- `assets/papers/`: paper and supplementary PDFs.
- `assets/video/`: the original 47-second opening and five independently playable H.264 sections (Motivation, Method, Comparison, Ablation, One-to-many).
- `assets/images/`: original research figures and video posters.

The page uses relative asset paths so it works under the GitHub Pages project URL. GitHub Pages publishes the root of the `main` branch. `.nojekyll` serves the files as a static site.

The opening preserves the authors' original text, audio, editing, and cover image. It attempts automatic looping playback with sound enabled. If the browser blocks audible autoplay, its native play control starts playback; the site does not silently mute it. Autoplay is disabled for reduced-motion preferences. The remaining clips are web-optimized excerpts from the supplied demo. Quantitative comparisons and ablations use native HTML tables; both user studies use the original supplementary figures. The source repository contains the project website, not the model implementation.
