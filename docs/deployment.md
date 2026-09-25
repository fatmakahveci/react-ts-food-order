# Deployment Guide

[Back to README](../README.md)

Lokma exports a static site to `out/`. GitHub Pages is the automated deployment
target. The existing private Sites publication is separate; the GitHub workflow
does not update it.

## GitHub Actions Pipeline

The [CI / CD workflow](../.github/workflows/ci.yml) runs on:

| Event | Checks | Deployment |
| --- | --- | --- |
| Pull request targeting `main` | Lint, tests, build and export verification | No |
| Push to `main` | Same checks, plus Pages configuration | Yes, after checks pass |
| Manual workflow dispatch | Same checks | Only when the selected branch is `main` |

The checks job installs the lockfile dependencies with `npm ci --ignore-scripts`
on Node.js 22, audits dependencies, runs ESLint and tests, and builds with TypeScript validation. It
checks that `out/index.html` and `out/og.png` exist before uploading the Pages
artifact. The deployment job depends on successful checks and deploys that same
artifact without rebuilding.

Workflow permissions default to `contents: read`. The checks job also has
`pages: read`; the deployment job has `pages: write` and `id-token: write`.
Deployment uses the built-in `GITHUB_TOKEN`, with no personal deployment token.
Pull request runs cannot execute the deployment job.

## Repository Setup

1. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**.
2. Check the `github-pages` environment's branch rules and any required reviewers.
3. Submit changes through a pull request into `main`.
4. After merge, open the [workflow runs](https://github.com/fatmakahveci/react-ts-food-order/actions/workflows/ci.yml)
   and confirm both jobs succeed. Use the URL attached to the deployment environment.

GitHub Pages was enabled for Actions during the CI/CD setup. Forks and newly
created repositories need their own Pages settings. The PR-build fallback URL
and path in the workflow refer to this repository; update them when adopting it
under a different repository name.

## Build Variables

Both variables are read at build time. Changing a hosting setting without
rebuilding does not update existing files.

| Variable | Purpose | Local default |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | Prefix for Next.js routes and assets, such as `/react-ts-food-order`. Use an empty value for a root-hosted site. | Empty |
| `SITE_URL` | Absolute deployment URL, including any repository path, used for social metadata. | `https://lokma-lezzet.fatmakhv.chatgpt.site` |

For `main`, the workflow reads the base path and site URL from `configure-pages`.
Pull request builds use `/react-ts-food-order` and
`https://fatmakahveci.github.io/react-ts-food-order` as validation values.

To reproduce a project-path build in a POSIX shell:

```bash
NEXT_PUBLIC_BASE_PATH=/react-ts-food-order \
SITE_URL=https://fatmakahveci.github.io/react-ts-food-order npm run build
```

For a root-hosted local preview, run `npm run build` without these overrides and
serve `out/` as described in the [README](../README.md). A project-path build must
be served at its configured path, not directly at the server root.

## Troubleshooting

### Checks fail

Run `npm run lint`, `npm test` and `npm run build` locally using Node.js 22.13+
within the 22.x line. Inspect the first failing step in the workflow. A failed
checks job prevents deployment.

### Pages configuration fails

Confirm that Pages uses GitHub Actions as its publishing source and that Actions
are enabled for the repository. Check repository and environment permissions.

### Assets return 404

Compare the deployed path with `NEXT_PUBLIC_BASE_PATH`. Rebuild using the correct
path and deploy the new artifact. Do not manually edit generated files in `out/`.

### Deployment succeeds but the domain does not open

A successful deployment does not establish that the domain's DNS resolves.
Check the Pages URL and its redirects separately from the Actions result.

During the first deployment check on **25 September 2026**, the default
`fatmakahveci.github.io/react-ts-food-order/` URL redirected to
`http://fatmakahveci.com/react-ts-food-order/`, and the custom domain did not
resolve from the verification environment. This is a recorded observation, not a
live health check. Verify current Pages and DNS settings before changing them.
An inherited account-level custom domain can affect other repositories; review
that scope before removing or changing it.

## Source Packages

The [Publish source package workflow](../.github/workflows/publish-source-package.yml)
is independent of website deployment. It runs when a GitHub release is published
or when manually dispatched. It publishes a source archive and checksum as an
OCI artifact to `ghcr.io/fatmakahveci/react-ts-food-order`.

That artifact contains source code, not a runnable application container or a
Pages build. Publishing it does not deploy the website.
