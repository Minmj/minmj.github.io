# minmj.github.io — Plot Map theme

A garden-plan personal site: grid-paper background, dashed plots, a title
block, a vertical "minmj" spine, a `garden.js` legend card (typed out on
load) and plant-tag project cards. Plain HTML + CSS + a small vanilla JS
typewriter effect — no build step.

## Files

```
index.html  about.html  projects.html
styles.css
.nojekyll
assets/favicon.svg  sprout-card.svg  budgeting-app-card.svg  typewriter.js
```

Served directly from the root of this repo via GitHub Pages — unrelated to
the Sprout app elsewhere on GitHub; it's just hosted from here.

## Editing

- Colours and fonts: the `:root` block at the top of `styles.css`.
- Card art: edit the SVGs in `assets/`.
- The typed code snippet: edit the `typewriter(...)` call at the bottom of
  `index.html`.
- Adding a project: copy a `.tag-wrap` block in `projects.html` and
  `index.html`.
- Nav links live in `.topnav` near the top of `<main>` on each page.
