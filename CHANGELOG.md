# Changelog

Notable project changes are recorded here. Unreleased entries have not been
assigned a release version or release date.

## Unreleased

### Added

- Production-export browser checks at 320, 390, 768 and 1440 pixels, including
  complete ordering, keyboard navigation, axe scans and asset/metadata validation.
- Domain repair, test/performance and asset-credit guides.
- Canonical URL, sitemap, favicon and descriptive social-image metadata.

- Price sorting, in-cart badges, mobile navigation and a floating order summary.
- Accessible checkout errors, first-error focus and visible order progress.
- Larger touch targets and more readable meal cards on small screens.

- Lokma restaurant interface with six sample dishes, category filters and search.
- Responsive cart, quantity controls, calculated totals and demo checkout.
- Branded social preview image and a README GIF of the ordering experience.
- GitHub Pages deployment after successful main-branch checks.
- ESLint flat configuration and automated menu and cart regression tests.
- Root security policy and a dedicated deployment guide.

### Changed

- Served responsive WebP menu photos and licensed variable fonts locally.
- Replaced the incompatible production start command with a static preview server.
- Added Chromium checks to the deployment gate and refreshed the README recording.
- Expanded unit regression coverage and documented non-obvious code behavior.

- Refined the restaurant UI with stronger contrast, clearer typography, pill navigation,
  inset food photography, category counts and consistent cart/checkout surfaces.
- Positioned in-cart badges over images to avoid shifting card content.

- Updated Next.js and its ESLint configuration to 16.3.6, React and React DOM to
  19.3.0, TypeScript to 6.0.3 and Vitest to 5.0.2.
- Updated React and Node.js type definitions and pinned PostCSS and Sharp overrides.
- Moved build tools and type definitions into development dependencies.
- Adopted React's scoped JSX types and an ES2017 TypeScript target for compatibility.

- Translated the active site, accessibility labels and social metadata to English.
- Configured Next.js to export static files to `out/`.
- Made deployment base paths and social URLs configurable at build time.
- Expanded CI to include lint, tests, TypeScript validation and static output checks.
- Updated setup, architecture and contribution documentation to match the active app.

- Standardized source filenames and directories to kebab-case; separated route files,
  components, cart context and assets, and renamed tests and the CI workflow.
- Corrected the npm package name to `lokma-food-order`.

### Removed

- Unused legacy components, styles and restaurant photo, including inactive Firebase code.
- Legacy component types and unused form, date-picker, CSS-tooling and Cypress dependencies.

### Fixed

- Restored focus after closing the cart and moved focus when checkout steps change.
- Kept the cart button named on small phones and removed tablet decoration overflow.

- Prevented crashes when removing unknown cart items and rejected invalid quantities/prices.
- Derived cart totals from line items in minor currency units to prevent decimal drift.
- Restarted repeated-addition notifications, trimmed search queries, labelled the cart
  dialog and distinguished padding clicks from backdrop clicks.
- Split menu data, formatting, filtering and checkout into focused modules and formatted
  source files for readability.

- Resolved lint issues in retained components with explicit types, an input display
  name and a cart-button animation that does not synchronously set state in an effect.

### Security

- Updated the dependency tree to address the Next.js and Sharp alerts on the default branch.
- Added a dependency-audit deployment gate and a separate weekly security audit.
- Enabled weekly npm update checks and disabled persisted checkout credentials.

## Release Notes Maintenance

When preparing a release, move the relevant entries into a versioned section with
the actual release date. Keep unreleased work in this section until then. Record
behavioural changes and user-visible fixes rather than every commit.
