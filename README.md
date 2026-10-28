# Wiffle Launch Monitor

A phone-camera golf launch monitor. Film a wiffle-ball swing face-on, the page tracks the ball in the first frames after impact, measures ball speed and launch angle, then flies a real golf ball with those numbers onto a virtual par 3.

Open the hosted page in Chrome or Safari: https://shawnlasalita-lgtm.github.io/wiffle-launch-monitor/

- **Live camera**: tap the ball once, arm, hit. It re-arms itself when the next ball is placed on the same spot.
- **Choose a video / Record a clip**: analyse a clip recorded in your camera app.
- **Type numbers in**: play the hole from known launch numbers.

Single file, no build step: `index.html`.

## Working from your phone

1. Open the Claude app, go to Code, and start a new session on `shawnlasalita-lgtm/wiffle-launch-monitor`.
2. Say what you want in plain words. Example: "Add a 4 Iron to the club list."
3. Claude edits `index.html`, runs the smoke test (`node check.mjs`), and pushes the change to `main`.
4. GitHub Pages publishes the new version to the link above within a couple of minutes.
5. If something looks wrong afterwards, start another session and say "undo the last change". Every version is kept in GitHub's history.
