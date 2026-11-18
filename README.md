# Swaroop Patil: portfolio

A Netflix-style personal portfolio. Live at https://swaroop-patil.pages.dev

Plain HTML, CSS and JavaScript, with no build step and no framework.

```
index.html      page structure
style.css       all styles
data.js         projects, GitHub repos and skills (edit this to add or change cards)
script.js       behaviour and interactions
assets/         avatars, PUBG QR code and the intro sound
```

To run it locally, serve the folder with any static server, for example `python3 -m http.server`, and open http://localhost:8000.

## Tests

Every change must pass the tests before it goes live.

**Fast checks (a few seconds)**: `npm install && npm test`
- `tests/syntax.test.js`: JS and CSS files are valid.
- `tests/data.test.js`: every project, repo and skill is complete and every link is well formed.
- `tests/site.test.js`: every file the page points at exists, scripts load in order.
- `tests/render.test.js`: loads the page in a simulated browser and checks all cards render.

**Real-browser checks (a few minutes)**: `npx playwright install` then `npm run e2e`
- `e2e/smoke.spec.js`: loads with no errors or missing files, sections render, images load.
- `e2e/responsive.spec.js`: no sideways scroll, hero visible, no clipped text.
- `e2e/interactions.spec.js`: modals, project links, flip cards, PUBG card, timeline.
- `e2e/a11y.spec.js`: no critical accessibility problems.
- Run on Chrome, Firefox and Safari engines and on desktop, laptop, iPad, iPhone and Android profiles.

**Analytics**: `analytics.js` sends named events to GoatCounter (cookie-free, no personal data): profile chosen,
project opened, project and repo links, resume views and downloads, contact clicks, card flips, sections reached,
scroll depth, time on page, keyboard shortcuts, screen size class, referrer and JavaScript errors seen by real visitors.
View them at https://swaroop29.goatcounter.com (event rows start with `event/`).

**On GitHub** (`.github/workflows/`):
- `ci.yml` runs everything on every pull request and every push to `main`, uploads the full report, and emails it on failure.
- `live-check.yml` tests the live site after each deploy and every 6 hours.

Email alerts need two repository secrets: `MAIL_USERNAME` (Gmail address) and `MAIL_PASSWORD` (a Gmail app password).
When you add a feature, add a test for it.
