# Asset Credits

[Back to README](../README.md)

## Menu Photos

The existing Unsplash images are now included as responsive WebP files under
`public/images/meals/`. Each has 160, 400, 800 and 1200 pixel variants, cropped to
4:3 at quality 76. The 160 pixel variant serves cart thumbnails; `srcset` and
`sizes` select larger variants for menu cards and the hero. Explicit dimensions
and reserved CSS containers prevent image-loading layout shifts.

| Local filename prefix | Original image |
| --- | --- |
| `classic-cheeseburger` | [Unsplash image](https://images.unsplash.com/photo-1568901346375-23c9450c58cd) |
| `margherita-pizza` | [Unsplash image](https://images.unsplash.com/photo-1574071318508-1cdbab80d002) |
| `mediterranean-bowl` | [Unsplash image](https://images.unsplash.com/photo-1512621776951-a57141f2eefd) |
| `italian-pasta` | [Unsplash image](https://images.unsplash.com/photo-1473093295043-cdd812d0e601) |
| `chocolate-brownie` | [Unsplash image](https://images.unsplash.com/photo-1606313564200-e75d5e30476c) |
| `garden-salad` | [Unsplash image](https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38) |

See the [Unsplash license](https://unsplash.com/license). These are illustrative
sample-menu photographs, not evidence of an operating restaurant.

## Fonts

DM Sans and Manrope are local Latin variable WOFF2 fonts obtained from Google
Fonts. Next.js serves and preloads them with `next/font/local`, using font swap
and its fallback metrics. Font files and their SIL Open Font License notices
are in `src/app/fonts/`.

- [DM Sans source](https://github.com/google/fonts/tree/main/ofl/dmsans)
- [Manrope source](https://github.com/google/fonts/tree/main/ofl/manrope)

The Latin subset matches the English interface. Revisit character coverage if
adding other languages.

## Project Artwork and Recording

`public/og.png` preserves the existing generated Lokma artwork, optimized to
1200 × 630 pixels. The favicon reuses the site's letter mark.

`docs/assets/demo.gif` is a seven-frame recording of the working interface:
home, menu, category filter, cart, quantity adjustment, fictional delivery
details and demo confirmation. It uses no customer data.
