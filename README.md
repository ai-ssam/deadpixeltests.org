# Monitor and Dead Pixel Test

Browser-based monitor diagnostics project focused on practical panel quality checks.

## What changed (2026-02-19)

- Removed in-page advertising code to resolve AdSense policy issues during quality review.
- Expanded from 14 to 18 tests.
- Added high-value modes:
  - Refresh Cadence Mapper
  - Input Lag Trainer
  - HDR Clipping Simulator
  - Subpixel Inspector
- Added trust pages required for publisher-quality review:
  - `about.html`
  - `privacy.html`
  - `contact.html`
  - `methodology.html`
- Reworked homepage with test instructions, FAQ, and transparent methodology links.

## Core stack

- HTML5
- Vanilla JavaScript (ES modules)
- CSS3

## Run locally

Open `index.html` in a modern browser, or use a static file server:

```bash
python -m http.server
```

## Content quality direction

For future AdSense resubmission, keep adding test methodology notes, panel-specific guidance, and update logs.
Avoid thin pages and placeholder-only sections.
