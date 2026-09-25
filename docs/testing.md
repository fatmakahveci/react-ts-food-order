# Testing and Performance

[Back to README](../README.md)

## Reproduce the Checks

Use Node.js 22.13+ within the 22.x line and the committed lockfile:

```bash
npm ci --ignore-scripts
npm audit --audit-level=low
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm test` runs 35 cases: one Node.js metadata check and 34 Vitest component/reducer
cases. They cover cart arithmetic, invalid inputs, overflow, immutable updates,
filtering, sorting, checkout errors and notification timing.

`npm run test:e2e` runs five scenarios at four sizes (20 browser checks). It
serves the production `out/` directory itself on port 4173. Stop any manual
preview using that port first. On Linux, use
`npx playwright install --with-deps chromium` to install required system libraries.
CI performs this installation before running the suite.

| Project | Viewport | Coverage |
| --- | --- | --- |
| Small phone | 320 × 740 | Ordering, keyboard, responsive layout, axe, metadata/assets |
| Phone | 390 × 844 | Same, with touch/mobile emulation |
| Tablet | 768 × 1024 | Same, with touch emulation |
| Desktop | 1440 × 1000 | Same, with mouse/keyboard |

The small phone also uses touch/mobile emulation. These are Chromium emulations,
not tests on physical devices or other browser engines.

The suite checks complete demo ordering, quantity updates, validation recovery,
step focus, Escape dismissal, focus restoration, horizontal overflow and local
image loading. Axe scans the home, populated cart and invalid checkout against
WCAG A/AA rule tags. Passing those automated scans is not a full accessibility
certification or a manual screen-reader audit.

Open `playwright-report/index.html` for results; failure screenshots and traces
are in `test-results/`. Both directories are ignored by Git. To use an existing
Chromium installation locally, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its
executable path. CI uses Playwright's installed Chromium.

## GitHub Pages Path Check

Build-time and test-time prefixes must match:

```bash
NEXT_PUBLIC_BASE_PATH=/react-ts-food-order \
SITE_URL=https://fatmakahveci.com/react-ts-food-order npm run build
NEXT_PUBLIC_BASE_PATH=/react-ts-food-order npm run test:e2e
```

The metadata tests verify the actual exported tags and sitemap, including the
repository path. The production preview is a local-only server, not a hosting
service. Deployment remains GitHub Pages.

## Performance Measurement: 25 September 2026

Measured production exports with Lighthouse 13.5.0 and headless Chrome 153,
using the default simulated mobile profile, a cold browser and the same local
static server. The baseline used the root path; the final build used the Pages
repository path. Each column is one measured run; scores vary by machine and run.

| Metric | Before | After |
| --- | ---: | ---: |
| Performance score | 76 | 81 |
| First Contentful Paint | 2.8 s | 0.9 s |
| Largest Contentful Paint | 5.3 s | 5.2 s |
| Cumulative Layout Shift | 0.006 | 0 |
| Total Blocking Time | 4.5 ms | 14 ms |
| Transferred resources | 1,023 KiB | 830 KiB |

Responsive local WebP assets removed the image-sizing warning. Local font loading
removed the external stylesheet request and improved initial rendering. The social
card decreased from approximately 1.9 MiB to 325 KiB; it is not part of the page's
normal resource transfer totals.

Largest Contentful Paint remains an area for improvement under this simulation.
The preview server does not compress responses; these figures are local lab
measurements, not live Pages or real-user Core Web Vitals. Public measurements
must wait for the [domain repair](domain-repair.md).

To repeat a measurement, run the production preview and use Lighthouse 13.5.0:

```bash
npm start
# In another terminal:
npx --yes lighthouse@13.5.0 http://127.0.0.1:4173 \
  --chrome-flags=--headless --only-categories=performance \
  --output=json --output-path=/tmp/lokma-performance.json
```

For a Pages-path export, start the preview with `NEXT_PUBLIC_BASE_PATH` and append
that prefix to the measured URL. Keep generated reports outside the repository.
