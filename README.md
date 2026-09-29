# Portfolio

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

1. **Hero / About** — ASCII monogram, decrypting name, bio, CTAs
2. **Skills + Projects** — skills tag cloud beside a grid of merged PRs
3. **Security Research / Contributions + Contact** - disclosures, OSS summary, terminal-style contact block
4. **Footer** — copyright, socials

