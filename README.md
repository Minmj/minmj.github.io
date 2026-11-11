# minmj.github.io — Plot Map theme

A garden-plan redesign of minmj.github.io: grid-paper background, dashed plots,
a title block, a vertical "minmj" spine, a `garden.js` legend card and
plant-tag project cards. Plain HTML + CSS, no build step.

## Files

```
index.html  about.html  projects.html
styles.css
.nojekyll
assets/favicon.svg  avatar.svg  sprout-card.svg  budgeting-app-card.svg
assets/vines/*.svg   (trailing ivy that hangs from the cards and plots)
scripts/install.sh  uninstall.sh  preview.sh
```

## Preview locally (macOS)

```bash
cd minmj-site
chmod +x scripts/*.sh
scripts/preview.sh          # opens http://localhost:8000
```

## Install into your repo

```bash
scripts/install.sh ~/path/to/minmj.github.io
cd ~/path/to/minmj.github.io
git add -A && git commit -m "Plot Map theme" && git push
```

Your old files are copied to `.plotmap-backup/` first. Add that folder to
`.gitignore` (or delete it after you're happy) so it isn't published.

GitHub Pages updates in about a minute after the push.

## Uninstall

```bash
scripts/uninstall.sh ~/path/to/minmj.github.io
```

This restores the files it replaced, removes the ones it added, and deletes
`.plotmap-backup/`. Commit the result to publish the revert. (You can also
just `git revert` the install commit.)

## Editing

- Colours and fonts: the `:root` block at the top of `styles.css`.
- Card art and the avatar: edit the SVGs in `assets/`. The avatar's text is already converted to outlines, so it looks the same everywhere (re-generate it if you change the handle).
- To use the avatar as your GitHub profile picture, export `assets/avatar.svg` to a 500×500 PNG (open it in a browser or Preview and export).
- Vines: decorative images in `assets/vines/`, each attached to one element via `<img class="vine ...">`. Delete an `<img class="vine">` line to remove that vine, or add `.vine { display: none; }` to `styles.css` to hide them all. They are hidden on phones.
- Adding a project: copy a `.tag-wrap` block in `projects.html` and `index.html`.
- The fonts load from Google Fonts; offline previews fall back to Georgia,
  system sans and a system monospace.
