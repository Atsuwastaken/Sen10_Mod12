# SCM Static Site — CI/CD with GitHub Actions & GitHub Pages

A static HTML/CSS/JS site that is linted, packaged, and published to GitHub Pages on every push to `main`.

## Pipeline (`.github/workflows/deploy.yml`)

1. **lint** – `npm ci` + `npm run lint` (ESLint). If this fails, nothing else runs.
2. **build** – copies `src/` to `dist/`, stamps the commit SHA, uploads it as a Pages artifact.
3. **deploy** – publishes the artifact with `actions/deploy-pages`.

## Run locally

```bash
npm install
npm run lint
npm run build
```

## Testing the quality gate

Remove the semicolon from `let count = 0;` in `src/script.js`, commit, and push:

```
src/script.js
  15:14  error  Missing semicolon  semi
✖ 1 problem (1 error, 0 warnings)
```

The **lint** job fails and **build**/**deploy** are skipped, so the broken code never reaches the live site. Restore the semicolon and push again to redeploy.
