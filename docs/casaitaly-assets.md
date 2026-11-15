# Casa Italy demo

Route: `/casaitaly` (`app/casaitaly`). Brand-specific components and data remain
under `components/pizza/cavasaitaly` and `data/pizza/cavasaitaly`; shared carousel
behavior is reused from Gholivand.

## Palette

The supplied website screenshot uses emerald green (approximately `#005a3d`)
and white. This demo develops it into dark green `#003f30`, warm cream
`#f7f2de`, and crust-inspired gold `#dbbd79`. The latter two are design accents,
not claimed official brand colors.

## Product assets

Seven distinct pizza references were supplied; duplicate brisket and meatball
screenshots are represented once. No burger photograph was attached to this
request. Prices are intentionally absent because legible prices were not
provided for these seven products. Ingredient summaries and editorial copy
should be confirmed by the restaurant before production use.

Final assets: `public/brands/pizza/cavasaitaly/products/cutouts/`.
Each product has its original generated transparent PNG and a 900 × 900 WebP
for the carousel. Alpha channels were checked before installation. The
source menu screenshots remain untouched.

Asset IDs: `meatball`, `steak`, `chicken`, `bacon`, `eggplant`, `brisket`, `pesto`.

Tool: built-in ImageGen, background-extraction mode. Prompt used for each
source screenshot:

> Extract only the complete original pizza; remove the plate, tabletop, text
> card and background. Preserve toppings, crust, color, perspective and product
> identity. Reconstruct only the small crust edge obscured by the card. Center
> the isolated pizza on genuinely transparent alpha with clean edges, no glow,
> shadow or background.

Pesto was regenerated with an explicit requirement for zero-alpha space
outside the crust, removing the first output's colored haze. Because these
are AI-assisted extractions from small screenshots, they should be checked
against original full-resolution restaurant photography before production.

## Logo

`public/brands/pizza/cavasaitaly/logo/instagram-profile.png` is an unchanged
copy of the supplied Instagram profile screenshot. The header crops and
isolates the actual white logo with CSS, preserving the original lettering.
The two generated extraction attempts were discarded due to noisy edges.

## Interaction

The shared GSAP carousel supports curved transitions, wrapping, selection of
neighbors, RTL arrows, keyboard navigation, and reduced motion. The stage uses
`touch-action: pinch-zoom` to keep one-finger swipes within the carousel while
allowing pinch zoom. Category changes reset the selection to the first match.
The story dialog supports Escape, a close button, and backdrop dismissal.

Responsive layout was manually checked by the user.
