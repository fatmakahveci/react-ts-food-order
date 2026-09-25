# Contributing

[Back to README](../README.md)

Bug fixes, documentation improvements and focused features are welcome. Keep all
user-facing text and documentation in English.

## Before You Start

- Search existing issues and pull requests to avoid duplicate work.
- Discuss substantial changes in an issue before implementing them.
- Report vulnerabilities privately using the [security policy](../SECURITY.md).
- Read the README's project structure: the current interface lives in
  `src/app/page.tsx` composes the menu and cart components in `src/components/`,
  with menu data in `src/data/` and cart state in `src/context/`.

## Local Development

Use Node.js 22.13+ within the 22.x line to match CI, with npm and the committed
lockfile.

```bash
npm ci --ignore-scripts
npm run dev
```

Create a focused branch, such as `fix/cart-total` or `docs/setup-guide`. Make
changes there and open a pull request into `main`; direct pushes to `main` are
blocked by repository rules.

## Naming and Structure

Use lowercase `kebab-case` for source directories and filenames, for example
`src/context/cart-provider.tsx` and `src/shared/constants.ts`. Keep
React component names in PascalCase. Use `.tsx` only for files containing JSX;
plain TypeScript types, constants and context definitions use `.ts`.

Keep Next.js route files in `src/app/` and cart context in `src/context/`. Create
component or asset directories only when needed. Use descriptive
test names ending in `.test.tsx` or `.test.mjs`. Put documentation guides in
`docs/` and their images or recordings in `docs/assets/`.

Preserve conventional entrypoint names such as `page.tsx`, `layout.tsx`,
`README.md`, `SECURITY.md` and `LICENSE.md`. Update imports and documentation
links together when moving or renaming files.

## Validation

For code changes, run:

```bash
npm run lint
npm test
npm run build
```

The build includes TypeScript checks; there is no separate `typecheck` script.
`npm test` runs the Node.js metadata test followed by Vitest tests for cart
behaviour, filtering and demo checkout.

Add regression tests when behaviour changes. For documentation-only changes,
verify commands and file paths against the repository, check relative links and
run `git diff --check`; a new application test is usually unnecessary.

## Pull Requests

Explain the problem, resulting behaviour and validation performed. Include
screenshots or a recording for visible UI changes, using fictional checkout data.
Keep changes focused and update the relevant documentation and
[changelog](../CHANGELOG.md).

Before requesting review:

- [ ] Checks relevant to the change pass.
- [ ] New or changed behaviour has appropriate regression coverage.
- [ ] User-facing copy, documentation and examples remain in English.
- [ ] No credentials, personal data or local environment files are included.
- [ ] Generated build directories and dependencies are excluded.
- [ ] Intentional documentation assets, such as `docs/assets/demo.gif`, are reasonably sized.

Pull requests run CI without deployment. Merging into `main` starts a new run
that deploys to public GitHub Pages after all checks pass. See the
[deployment guide](../docs/deployment.md) before modifying workflow permissions,
base paths or hosting behaviour.
