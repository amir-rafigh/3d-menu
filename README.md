# Menu Demo Platform

Independent restaurant and cafe menu demos built with Next.js App Router,
React, TypeScript, Tailwind CSS, GSAP, and `@gsap/react`.

## Routes and scope

- `/`: minimal project identifier.
- `/baklava`: Gholivand's Persian, RTL animated menu (Phase 3).
- `/pizza/cavasaitaly`: unchanged placeholder for a future independent demo.

No ordering, backend, authentication, cart, or payment functionality is included.

## Development and checks

Use the existing pnpm version declared in `package.json`.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm exec next typegen
pnpm exec tsc --noEmit
node --experimental-strip-types --test tests/carousel.math.test.mjs
pnpm build
pnpm start
```

Read the relevant installed guides in `node_modules/next/dist/docs/` before
changing Next.js code, as required by `AGENTS.md`.

## Directory structure

```text
app/
  layout.tsx, page.tsx, globals.css
  baklava/
    layout.tsx, page.tsx
  pizza/cavasaitaly/
    layout.tsx, page.tsx
components/
  shared/
    ui/
    carousel/
      CircularCarousel.tsx
      CarouselItem.tsx
  baklava/
    BaklavaHeader.tsx
    BaklavaMenu.tsx
    BaklavaCategories.tsx
    BaklavaCarousel.tsx
    BaklavaProductDetails.tsx
    BaklavaMenu.module.css
  pizza/cavasaitaly/
hooks/
  useCircularCarousel.ts
lib/carousel/
  carousel.math.ts
  carousel.config.ts
data/
  baklava/
    products.ts, additional-products.ts, categories.ts
  pizza/cavasaitaly/
types/
  product.ts, carousel.ts
tests/
  carousel.math.test.mjs
public/
  brands/
    baklava/
      logo/logo-inline.svg
      products/                # Original PNGs and uploaded product photos
    pizza/cavasaitaly/
      logo/, products/
  shared/
```

Reserved empty directories use `.gitkeep`. The existing `@/*` alias resolves
from the project root; there is no duplicated `src` tree.

## Architecture and animation

The root document and brand route shells remain Server Components. The static
brand header is rendered by the server. Client components are limited to menu
filtering, product details within the interactive subtree, and carousel behavior.
Brand styling is isolated in a CSS Module; global CSS remains neutral.

Shared carousel rendering accepts typed entries, translated labels, class names,
and a details renderer. It imports no brand data or styles. Brand adapters own
category filtering, Persian content, price formatting, and visual identity.

`useCircularCarousel` uses `useGSAP` to animate a single continuous progress
number. Every GSAP update evaluates each product's wrapped angular offset and
computes `sin(angle) * radiusX` and `(1 - cos(angle)) * radiusY`, plus scale,
subtle rotation, opacity, and stacking order. React updates only when the nearest
active index changes. Hidden seams permit circular wrapping without a visible
plate jumping across the viewport. Rapid navigation replaces the running tween
while retaining its current progress and accumulated target.

A ResizeObserver adapts radii to the stage width. CSS sets mobile-first plate
sizes; transparent image padding is kept outside the button's hit area so it
cannot intercept clicks on an adjacent plate. The original image orientation,
proportions, transparency, and asset files are preserved. Only the active image
and its two neighbors on each side mount through Next Image, with responsive sizes and high priority on the
initial product.

Previous/next buttons, pagination, adjacent selection, RTL arrow keys, Home/End,
and horizontal Pointer Event swipe/drag gestures share the same engine.
`touch-action: pan-y pinch-zoom` preserves vertical scrolling and pinch zoom.
Reduced-motion preference changes finish the transition immediately. Tweens,
ResizeObserver, and preference listeners are cleaned up when the carousel unmounts.
Brand filters remount the collection with a consistent first active product.

The existing Tailwind Turbopack rule now excludes `*.module.css`: forcing those
files through `as: '*.css'` stripped module class-name exports in this installed
Next version. Global Tailwind processing is retained and CSS Modules use native
Next.js scoping. No new dependencies were needed in Phase 3.

## Assets and data provenance

The original logo at `/brands/baklava/logo/logo-inline.svg` and all four uploaded
PNGs are used directly. The PNG filenames remain:

- `Pistachio-Garnished Golden Pastry on White Plate.png`
- `Pistachio pastry on a white plate.png`
- `Pistachio pastry on a white plate (1).png`
- `Chocolate dessert on white plate.png`

The public product URL prefix is `/brands/baklava/products/`. `encodeURI`
encodes spaces while preserving parentheses. Original assets remain unchanged
on disk. Eight completed photos additionally have transparent PNG edits in
`products/cutouts/`, now used by the carousel. See `docs/hot-drink-cutouts.md`
for their source mapping and ImageGen prompt set.
These cover four hot drinks, two cold drinks, and two tea servings. The other
22 unique JPEG photos still use their original backgrounds until edits are ready.

The supplied menu reference shows the rolled milk/honey pastry at 48,000 toman
and the heart pastry at 52,000 toman. Those are reference prices, not verified
current prices. The remaining original PNGs and all additional photos have descriptive temporary display
labels explicitly marked in the UI, with no invented prices or descriptions.
No additional categories without corresponding products are shown.
The catalog contains 34 products: 15 baklava, 6 desserts, 4 hot drinks, 2 cold
drinks, and 7 teas/infusions. Thirty unique JPEGs from the later upload are
listed in `data/baklava/additional-products.ts`, preserving their original
filenames and aspect ratios. The byte-identical duplicate
`imgi_154_DSC00029-copy-scaled (1).jpg` remains on disk but does not create a
duplicate menu entry. JPEG photos use contained presentation; PNG cutouts retain
their existing presentation. Categories scroll horizontally on narrow screens
and pagination shows at most five neighboring indicators for large collections.
The project uses the local variable Vazirmatn font from `public/fonts/` through `next/font/local`, with weights 100–900 and swap display. The bundled OFL license is preserved.

## Phase 3 validation

- ESLint and strict TypeScript validation.
- Production build.
- Mathematical tests for negative/repeated turns, the continuous elliptical path,
  scale/rotation bounds, and invisible seams for small and 34-item collections.
- Browser review at 320, 375, 390, 430, 768, and 1440px, including image loading,
  horizontal overflow checks, navigation, rapid repeated navigation, circular
  wrapping, category filtering, keyboard navigation, and swipe-style mouse dragging.
- Physical touchscreen testing and device-level reduced-motion testing remain
  recommended; these behaviors are implemented but were not tested on real mobile
  hardware in this environment.

The root and pizza route implementations remain unchanged. Stop at Gholivand;
other restaurant demos are outside this phase.
