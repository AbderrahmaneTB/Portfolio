# Portfolio

Personal site of Abderrahmane Tayeb Boudjema. Built with Next.js 16, Tailwind CSS 4 and Framer Motion, deployed on Vercel.

## Run locally

```bash
npm ci
npm run dev   # http://localhost:3000
```

If styles look out of date while developing (this folder lives in OneDrive, which can confuse the file watcher), stop the server, delete `.next` and start it again.

## Edit content

All text, links and images are in [`lib/data.ts`](lib/data.ts):

- `competitions`: hero badges, the climb chart, the medal table and the competition cards
- `roles`, `chowkpilot`, `radarProject`, `stressProject`, `webProjects`, `skills`, `profiles`

### Add a certificate

1. Save the full certificate as `public/certificates/<name>.webp` (about 1700 px wide) and a 720 px wide copy as `public/certificates/<name>-thumb.webp`.
2. Add a `certificate` object to that competition in `lib/data.ts`. The existing entries are working examples.

## How the page is built

- **Theme: signal over noise.** Colours follow the magma colour map used for spectrograms (violet, magenta, amber). Gold, silver and bronze are reserved for competition ranks.
- **Type:** Bricolage Grotesque for display, Geist for text, JetBrains Mono for instrument labels, and Doto (dot-matrix) for the LED rank numerals.
- **Hero:** `components/spectrogram-field.tsx` draws a live spectrogram; the pointer acts as a transmitter. The name decodes out of noise after the intro (`components/intro.tsx`, shown once per session).
- **Motion:** scroll reveals are CSS driven (`data-reveal`, switched on by `components/reveal-observer.tsx`), so the page stays readable without JavaScript. All animation follows one switch, `<html data-motion="on|off">` (`components/motion.tsx`). It starts from the system "reduce motion" setting, and the Motion toggle in the header lets visitors override it (remembered in their browser). If animations look frozen on your own machine, check Windows Settings > Accessibility > Visual effects > Animation effects, or use the toggle.
- **Demos:** `components/snr-demo.tsx` is an illustration of a chirp at different noise levels, not challenge data. `public/projects/chowkpilot-demo.mp4` is real SUMO footage from the ChowkPilot repository.
