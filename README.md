# SCM Static Site — CI/CD with GitHub Actions & GitHub Pages

A static HTML/CSS/JS site that is linted, unit-tested, packaged, and published to GitHub Pages on every push to `main`.

## Pipeline (`.github/workflows/deploy.yml`)

1. **lint** – `npm ci` + `npm run lint` (ESLint). If this fails, nothing else runs.
2. **test** – runs after lint: `npm test` (Jest). If any test fails, nothing is packaged or deployed.
3. **build** – needs both `lint` and `test`; copies `src/` to `dist/`, stamps the commit SHA, uploads it as a Pages artifact.
4. **deploy** – publishes the artifact with `actions/deploy-pages`.

## Run locally

```bash
npm install
npm run lint
npm test
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

## Page-load function & Jest tests

`src/welcome.js` defines `getWelcomeMessage(date)`, which builds a time-of-day greeting (morning / afternoon / evening plus the weekday). `showWelcome()` is attached to `window`'s `load` event, so it runs when the page loads and fills the `#welcome` banner.

`tests/welcome.test.js` checks each greeting branch, that the `load` event fills the banner, and that a missing element doesn't crash the page.

## Testing the test gate

Change `'Good afternoon'` to `'Good afternon'` in `src/welcome.js` and push. ESLint still passes, but Jest fails:

```
✕ says good afternoon between noon and 6pm
Tests: 1 failed, 4 passed, 5 total
```

The **test** job fails, so **build**/**deploy** are skipped. Fix the typo and push again: all 5 tests pass and the site redeploys.
