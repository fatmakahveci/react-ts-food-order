# Security Policy

## Supported Versions

Security updates are provided for the latest version on the default branch.
Older releases and unmaintained branches may not receive security fixes.

## Project Scope

The active Lokma page is a static frontend demo. Its checkout does not transmit
or persist entered details, process payments or create real orders. Cart state
is held in browser memory. Images and fonts are fetched from external providers.

Reports about the application, dependencies, exposed credentials or CI/CD
configuration are welcome. Use fictional data when reproducing an issue.

## Reporting a Vulnerability

Please do not disclose security vulnerabilities in public issues, discussions,
or pull requests.

Report a vulnerability through this repository's
[private vulnerability reporting](https://github.com/fatmakahveci/react-ts-food-order/security/advisories/new).
If that option is unavailable, contact the repository owner through the
[GitHub profile](https://github.com/fatmakahveci) to arrange a private reporting
channel.

Include the affected component and version, reproduction steps, potential
impact, and any suggested mitigation. Reports will be reviewed as promptly as
possible, and coordinated disclosure is appreciated.

## Automated Checks

CI audits production and development dependencies before deployment and fails
for reported vulnerabilities of low severity or above. A separate weekly audit
checks the lockfile without deploying, and Dependabot checks npm packages and
GitHub Actions weekly. Checkout steps do not persist Git credentials.

A passing audit means no known vulnerabilities were reported by the registry at
the time of the check; it is not a guarantee that the application is vulnerability-free.
