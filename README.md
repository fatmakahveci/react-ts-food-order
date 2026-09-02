# React Food Ordering Experience

[![React](https://img.shields.io/badge/React-TypeScript-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-React-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Last commit](https://img.shields.io/github/last-commit/fatmakahveci/react-ts-food-order)](https://github.com/fatmakahveci/react-ts-food-order/commits/main)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE.md)

A Next.js food-ordering interface with a typed cart, meal selection, modal checkout flow, and reusable UI components.

## Highlights

- Browse available meals and add configurable quantities
- Review, increment, decrement, and remove cart items
- Context-based cart state and derived totals
- Checkout form and responsive modal interaction

## Technology

- Next.js
- React
- TypeScript
- React Context
- Cypress

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality Checks

```bash
npm run lint
npm run build
```

## Repository Structure

- `src/app/components/Meals` — meal catalogue and quantity controls
- `src/app/components/Cart` — cart and checkout experience
- `src/app/store` — typed cart context and reducer

## Project Resources

- [Changelog](CHANGELOG.md)
- [Contributing guide](.github/CONTRIBUTING.md)
- [Security policy](.github/SECURITY.md)
- [License](LICENSE.md)
