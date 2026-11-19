# Casa Italy landing demo

- Landing: `/casaitaly/landing`.
- Existing digital menu: `/casaitaly`.
- The logo in the menu links back to the landing. All landing menu links open the existing menu.
- The mobile-first layout follows the approved mockup: compact header, tall kitchen video, welcome, menu CTA, three pizza previews, footer and four fixed navigation actions.
- The pizza previews reuse the existing meatball, steak and pesto WebP cutouts and product names.

## Video

`public/brands/pizza/cavasaitaly/landing/casa-kitchen.mp4` uses the supplied `slider_10485_1779289718.mp4`, remuxed losslessly with FFmpeg `-c copy -movflags +faststart` for progressive playback. The poster is a frame extracted at 12 seconds.

Playback starts muted and inline, with accessible pause/play and sound controls. It pauses offscreen or when the page is hidden, respects reduced motion, and preserves a manual pause. The menu remains accessible independently of video loading.

## Interactive demo scope

The native modal bottom sheets support Escape, dismissal, keyboard focus containment and focus restoration. Background scrolling is locked while a sheet is open.

- **Reservation:** name, normalized Iranian mobile number (Latin, Persian or Arabic digits), 1–8 guests, date and illustrative times. Dates and time validation use Tehran time; past times and dates beyond 30 days are rejected. A request is saved as pending in the current browser. Cancellation is available until 30 minutes before the selected time; cancelled requests can be replaced.
- **Feedback:** 1–5 stars and a required message; up to 20 entries are stored in the current browser.
- **Contact:** the existing Ardabil/Saadi address, a map search and the Instagram URL already used by the digital menu. No phone number, precise map pin or opening hours are invented.

Forms explicitly disclose that they are browser-local demonstrations. They do not contact the restaurant, establish real table availability, send SMS, connect to an admin panel or create a confirmed reservation. Stored demo entries use the keys `casa-italy:demo-reservation:v1` and `casa-italy:demo-feedback:v1`.

The route is marked `noindex` for this client preview. Other demo routes and their data remain independent.

## Validation

`pnpm exec tsc --noEmit` and `pnpm build` passed after the landing implementation. The user manually reviewed the browser preview and requested skipping further automated browser checks.
