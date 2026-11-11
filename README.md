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

- `competitions`: the hero badges, the podium chart and the results in Experience
- `roles`, `chowkpilot`, `llmLab` (the language-model card), `webProjects`, `stressProject`, `skills`, `topics` (the band under the hero), `profiles`

### Add a certificate

1. Save the full certificate as `public/certificates/<name>.webp` (about 1700 px wide) and a 720 px wide copy as `public/certificates/<name>-thumb.webp`.
2. Add a `certificate` object to that competition in `lib/data.ts`. The existing entries are working examples.

## How the page is built

- **Theme: signal over noise.** Colours follow the magma colour map used for spectrograms (violet, magenta, amber). Gold, silver and bronze are reserved for competition ranks.
- **Type:** Bricolage Grotesque for display, Geist for text, JetBrains Mono for instrument labels, and Doto (dot-matrix) for the LED rank numerals.
- **Hero:** `components/spectrogram-field.tsx` draws a live spectrogram; the pointer acts as a transmitter. The greeting cycles through Hello, Salam, Bonjour and Azul, and the name rises letter by letter out of a blur after the intro (`components/intro.tsx`, shown at most once every six hours). On desktop the hero fills the first screen.
- **Experience:** `components/climb-chart.tsx` plots each podium as an LED module by month and rank. The climb line draws itself and each module lights as the line reaches it; the timing is computed from the line's easing, so the two stay in sync. Every result below the chart carries its evidence: the SNR demo, the Zindi pipeline (`components/stress-flow.tsx`) or the certificate.
- **Projects:** ChowkPilot with its real SUMO recording and results, the language-model card (a GPT built from scratch beside a QLoRA fine-tune of Qwen2.5-3B, every figure from their READMEs), then the web apps.
- **Contact:** the same spectrogram, locked onto a clean, repeating radar chirp.
- **Motion:** there are no fade-ins on scroll. Motion is kept to a few authored moments (the intro, the podium chart, the spectrograms, the radar sweep), so the whole page reads without JavaScript. All animation follows one switch, `<html data-motion="on|off">` (`components/motion.tsx`). It starts from the system "reduce motion" setting, and the Motion toggle in the header lets visitors override it (remembered in their browser). If animations look frozen on your own machine, check Windows Settings > Accessibility > Visual effects > Animation effects, or use the toggle.
- **Demos:** `components/snr-demo.tsx` is an illustration of a chirp at different noise levels, not challenge data. `public/projects/chowkpilot-demo.mp4` is real SUMO footage from the ChowkPilot repository.
