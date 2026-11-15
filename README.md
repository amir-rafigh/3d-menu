# Menu Demo Platform

A multi-brand restaurant and cafe menu showcase built with Next.js App Router,
React, TypeScript, Tailwind CSS, GSAP, and `@gsap/react`.

## Scope

Phases 1 and 2 cover starter cleanup and architecture only. All routes render
minimal identifiers. Brand design, menu data, carousel logic, animation, and
interactive components await architecture approval.

## Development

Use pnpm (version declared in `package.json`).

```sh
pnpm install
pnpm dev
pnpm lint
pnpm exec next typegen
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

Read the relevant installed guides in `node_modules/next/dist/docs/` before
changing Next.js code, as required by `AGENTS.md`.

## Directory structure

```text
app/
  layout.tsx                   # Neutral root document and metadata
  page.tsx                     # Project identifier (/)
  globals.css                  # Tailwind import and minimal shared baseline
  baklava/
    layout.tsx                 # Independent metadata, Persian language and RTL
    page.tsx                   # Gholivand placeholder (/baklava)
  pizza/cavasaitaly/
    layout.tsx                 # Independent metadata and layout boundary
    page.tsx                   # Pizza placeholder (/pizza/cavasaitaly)
components/
  shared/
    ui/
    carousel/
  baklava/
  pizza/cavasaitaly/
hooks/
lib/carousel/
data/
  baklava/
  pizza/cavasaitaly/
types/
public/
  brands/
    baklava/
      logo/
      products/                # Four original uploaded PNGs
    pizza/cavasaitaly/
      logo/
      products/
  shared/
```

Empty directories contain `.gitkeep` so Git retains the intended structure.
No speculative component files, data, hooks, or types have been added.
Existing configuration files remain at the project root.

## Architecture boundaries

- Keep route pages and layouts as Server Components by default. Introduce client
  boundaries only for interactions and animation when those are implemented.
- Each brand owns its layout, components, data, assets, and future styles. Keep
  brand styles in CSS Modules beside the relevant route or component; reserve
  global CSS for genuinely shared resets. Do not put brand colors or fonts in
  the root layout. The neutral root wraps all routes without a shared brand shell.
- Keep reusable UI and carousel rendering in `components/shared`. Shared code
  must not import brand components or data. Brand components may compose shared
  code and provide brand-specific content through props.
- Reserve `hooks` for reusable interactive behavior and `lib/carousel` for pure
  circular/elliptical positioning math and configurable animation parameters.
  Implement these only in the approved animation phase.
- Keep future product/category records under `data/<brand>` and their shared
  TypeScript contracts under `types`. Define interfaces when the corresponding
  data or carousel behavior is implemented; do not invent product records now.
- Preserve the existing `@/*` root import alias and configuration. There is no
  `src` directory in this project.

## Asset inventory

These uploaded files were moved unchanged from `public/` to
`public/brands/baklava/products/`:

- `Chocolate dessert on white plate.png`
- `Pistachio pastry on a white plate.png`
- `Pistachio pastry on a white plate (1).png`
- `Pistachio-Garnished Golden Pastry on White Plate.png`

Their public URL prefix is now `/brands/baklava/products/` (URL-encode spaces
when constructing URLs). No existing application code referenced these images.
SHA-256 hashes matched before and after every move. Original filenames, quality,
and transparency are preserved. No uploaded logo or font was present during
inspection; their directories are reserved.

## Reset inventory

Removed starter assets: `app/favicon.ico`, `public/file.svg`, `public/globe.svg`,
`public/next.svg`, `public/vercel.svg`, and `public/window.svg`.

Replaced starter content in `app/page.tsx`, `app/layout.tsx`, `app/globals.css`,
and this README. Removed the starter Google font imports and default theme.
Added the two brand route pairs and reserved directories above.
Added only `@gsap/react`; existing dependency versions and configuration were
retained. Git history and environment files were left untouched.

## Validation

- `pnpm lint`: passed.
- `pnpm exec next typegen` and `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed; all three initialized routes are statically prerendered.
- Production server checks: `/`, `/baklava`, and `/pizza/cavasaitaly` returned
  HTTP 200 with their expected identifiers; the Persian layout had `lang="fa"`
  and `dir="rtl"`.
- All four new PNG URLs returned HTTP 200 with the original file lengths.
  Encode spaces in asset URLs while preserving parentheses (as `encodeURI`
  does); over-encoding parentheses produced a 404 with this installed server.
- Configuration files and existing dependency versions remain unchanged.

No menu UI, invented menu data, carousel, animation engine, or pizza UI is
implemented. Architecture approval is required before Phase 3.
