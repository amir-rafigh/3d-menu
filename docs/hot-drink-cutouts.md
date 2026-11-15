# Hot drink transparent cutouts

Created with the built-in ImageGen tool in background-extraction edit mode,
with `transparent_background: true`. Original JPEGs remain unchanged. Only the
four hot-drink catalog image references and presentation metadata were updated.

## Files

Under `public/brands/baklava/products/cutouts/`:

- `imgi_111_DSC05783-copy-scaled-cutout.png` (latte art)
- `imgi_114_DSC05799-copy-scaled-cutout.png` (marshmallow topping)
- `imgi_115_DSC05824-copy-scaled-cutout.png` (chocolate flakes)
- `imgi_116_DSC05850-copy-scaled-cutout.png` (yellow drink and rosebud)

The alpha channel is present in all four files; transparent areas occupy
approximately 55–65% of their canvases. The carousel uses the existing cutout
presentation, preserving each output's intrinsic aspect ratio.

## Prompt set

Each source JPEG was submitted separately as the edit target with this prompt;
`SUBJECT` was substituted with the matching description below.

> Use case: background-extraction. Edit target: the provided original product photo of SUBJECT. Remove ONLY the black tabletop, distant blurred background and cast shadow. Preserve the exact existing drink, cup, handle and full saucer, their colors, photographic texture, toppings, lighting, camera angle and proportions. Make the entire surrounding background genuinely transparent, including the opening inside the cup handle. No black fringe, no opaque rectangle, no checkerboard painted into the pixels. Keep one single complete cup-and-saucer centered, fully visible, with modest consistent transparent padding, suitable as an isolated product cutout in an animated food menu. Do not redesign, invent, replace or add any product details. Output a single transparent PNG product cutout, not a collage.

Subjects, in file order:

1. coffee with white latte art, handle on the LEFT
2. drink topped with pastel marshmallows and dark chocolate drizzle, handle on the RIGHT
3. white foamy drink with scattered dark chocolate flakes, handle on the RIGHT
4. yellow drink with white foam petals and a purple rosebud, handle on the RIGHT

## Additional completed cutouts installed

The following additional built-in ImageGen background-extraction outputs were
copied into `public/brands/baklava/products/cutouts/` and connected to their
existing catalog entries. Original JPEGs remain unchanged.

- `imgi_117_coff-70-scaled-cutout.png`: iced drink with lemon.
- `imgi_121_coff-72-scaled-cutout.png`: layered drink in a stemmed glass.
- `imgi_126_coff-43-scaled-cutout.png`: white teapot and full serving set.
- `imgi_127_coff-37-scaled-cutout.png`: tea in a slender glass and saucer.

Eight completed edited PNGs are now installed in total. The 22 other unique
uploaded JPEGs still use their original backgrounds; their cutouts are not ready.
The four original baklava PNGs already have transparency and remain unchanged.
Portrait cutouts use a bounded image height with object containment to stay
within the carousel composition.

Additional prompt template (each original photograph submitted separately with
`transparent_background: true`, substituting its subject description):

> Use case: background-extraction. Edit the supplied original product photograph, changing ONLY its background. SUBJECT. Remove the tabletop, blurred environment, cast shadow and all background between disconnected serving objects. Preserve the exact photographed product identity, food shape, texture, garnish, color, perspective, orientation, lighting and all serving dishes, utensils and accessories belonging to this serving. Preserve transparent and reflective glass naturally, with transparent background visible through empty glass areas and handle openings. Do not turn glass opaque gray or black. Do not add or redesign food, dishes or decoration. Retain delicate pastry strands and chocolate flakes; use clean antialiased edges without dark fringe, white halo, painted checkerboard or leftover rectangular background. Deliver ONE complete isolated product or original grouped serving, centered and fully visible with consistent modest transparent padding. Background must be genuinely transparent alpha. No extra shadow or glow. Transparent PNG suitable for the same curved cafe carousel as the baklava cutouts.
