# yingxu

Vanilla HTML/CSS/JS breathing control aid. No build step, no dependencies, no package manager.

## Entry point

`yingxu.html` — open in a browser (or serve with any static file server).

## Structure

| File | Purpose |
|---|---|
| `yingxu.html` | Shell with canvas, water div, controls |
| `style.css` | Dark/light mode via `prefers-color-scheme`, CSS custom properties |
| `script.js` | Timer logic, canvas moon rendering, Web Audio API tones |

## How it works

- 3 cycling modes clicked via the main area: `[inhale seconds, exhale seconds, total minutes]`
  - `[5, 5, 10]`, `[4, 6, 15]`, `[4, 6, 20]`
- Water rises during inhale phase, falls during exhale phase
- Moon drawn on a `<canvas>` with `arc()`
- Sound uses `AudioContext.createOscillator()` — dual-oscillator **binaural beat** (6 Hz Theta) via `StereoPannerNode`; fade-out covers each full phase; unmuted by clicking "Muted"
  - **Requires headphones** to perceive the binaural beat effect; without headphones the two frequencies play as a regular tone
  - Inhale tone: L=170 Hz, R=164 Hz (avg 167 Hz). Exhale: L=160 Hz, R=154 Hz (avg 157 Hz)
- No service worker, no offline support, no localStorage

## Mobile notes

- Fully compatible with modern mobile browsers (Chrome Android 57+, Safari iOS 14.5+)
- Uses Screen Wake Lock API (`navigator.wakeLock`) to prevent device sleep during active timer; automatically released when timer ends or tab is hidden
- Timing uses `Date.now()` (wall-clock) instead of rAF timestamps — timer survives background tab switching correctly
- iOS requires unmuting once via the "Muted" button to initialize & resume `AudioContext`

## Development

No commands needed. Edit files and refresh the browser.
