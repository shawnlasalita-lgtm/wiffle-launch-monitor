# Wiffle Launch Monitor: notes for Claude

Shawn's hobby project, and Shawn is not a programmer. A phone-camera golf launch monitor: film a wiffle-ball swing, the page tracks the ball after impact, measures ball speed and launch angle, then flies a real golf ball with those numbers onto a virtual par 3.

Live site: https://shawnlasalita-lgtm.github.io/wiffle-launch-monitor/ (GitHub Pages, public repo).

## Layout

- `index.html` is the entire app, about 1,170 lines. Script sections are marked `// ---------- NAME ----------`: FLIGHT PHYSICS, HOLE / COURSE, 3D SCENE RENDERER, SCREENS, VIDEO, TRACKER, MEASUREMENT, HOME UI, MARK SCREEN, REVIEW SCREEN, MANUAL, SHOT VIEWS, LIVE CAMERA, HOME SCENE / HISTORY / MAP.
- Shot history is kept in the browser's localStorage.
- `.github/workflows/pages.yml` publishes the repo to GitHub Pages on every push to `main`. No setup needed.
- `check.mjs` is a smoke test. `node check.mjs` opens the page in headless Chromium, fails on any JavaScript error, and saves a screenshot.

## How to make a change

1. Edit `index.html`. Keep it a single file, vanilla JavaScript, no build step.
2. Run `node check.mjs` and look at the screenshot. It must end with `OK`.
3. Commit on `main` with a plain-language message and push. GitHub Pages updates within a couple of minutes.
4. Report back in everyday words: what changed and where to look.

## Be careful with

- Camera and video code only runs on a real phone browser. The smoke test cannot exercise it, so say clearly when a change could not be tested here.
- The physics constants. Changing them changes every measured shot, so change them only when asked.
