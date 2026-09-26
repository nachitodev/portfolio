# Portfolio

VCR/CRT-styled retro boot-up portfolio for Ignacio Maidana.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Bun

## Scripts

- `bun run dev` — start the dev server
- `bun run build` — type-check and build for production
- `bun run preview` — preview the production build
- `bun run lint` — run ESLint

## Structure

```
src/
  components/   UI components (Boot, Background, DecryptText, VCREffects)
  data/         Static content (boot sequence, profile)
  hooks/        Shared React hooks (useIntersection, useTimecode)
  lib/          Utilities (localStorage flag helpers)
```

The site has two phases: a boot/intro screen (with sound, glitch text, and a
skip option persisted to localStorage) and a scrollable portfolio with exactly
three full-screen scenes plus a footer, in a hacker/Y2K aesthetic:

1. **Hero / About** — ASCII monogram, decrypting name, bio, CTAs
2. **Skills + Projects** — skills tag cloud beside a grid of merged PRs
3. **Security Research / Contributions + Contact** — disclosures, OSS summary, terminal-style contact block
4. **Footer** — copyright, socials, terminal cursor easter egg

Each scene keeps its ambient backdrop image under a scrim, wrapped in a
section-reveal fade-up; VCR effects (REC, timecode, noise) sit below the
content layer and are disabled under `prefers-reduced-motion`.

## Notes

- User prefs (`auto_skip_intro`, `boot_muted`) are stored as boolean flags in
  localStorage via `lib/storage.ts`.
- Images under `public/images/` ship in `.avif`, `.webp`, and `.png`; scenes render
  them via a `<picture>` element with a `avif → webp → png` fallback chain.