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
- `assets/video/`: the opening showcase and five independently playable H.264 sections (Motivation, Method, Comparison, Ablation, One-to-many).
- `assets/images/`: original research figures and video posters.

The page uses relative asset paths so it works under the GitHub Pages project URL. GitHub Pages publishes the root of the `main` branch. `.nojekyll` serves the files as a static site.

The video is a web-optimized version of the authors' supplied demo. Paper figures and quantitative results are taken from the supplied manuscript and supplementary material. The source repository contains the project website, not the model implementation.
