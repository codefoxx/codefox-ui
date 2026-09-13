# Codefox UI

Reusable React UI primitives and patterns for Codefox projects.

The public npm package is planned as:

```text
@codefoxpro/ui
```

> Codefox UI is currently pre-1.0 and under active bootstrap. The package will be published after the initial library and release foundations are in place.

## Goals

Codefox UI exists to give Codefox applications a small, owned UI layer with:

- reusable application-agnostic React components
- accessible interaction primitives
- semantic design tokens
- a deliberately small typed public API
- styling implementation details kept behind components where practical

shadcn/ui is used as upstream source material and a component/design reference. Components copied or adapted from shadcn become owned Codefox UI source code and are exposed through Codefox UI's own public API.

## Non-goals

Codefox UI is not a home for application-specific feature components or business concepts. Components such as a meetup card, RSVP selector, or application navigation belong in the applications that own those concepts.

## Installation

Once the first public release is available:

```bash
npm install @codefoxpro/ui
```

React and React DOM are peer dependencies and are supplied by the consuming application.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

## Repository structure

```text
src/                 public library source
tests/               package-level tests
docs/adr/             architecture decision records
.github/workflows/    continuous integration
```

Stable public exports are added deliberately through `src/index.ts`.

## Architecture

The initial architecture decisions are documented in [`docs/adr`](docs/adr/README.md):

- React + TypeScript + Vite
- shadcn/ui as upstream source material
- public package name `@codefoxpro/ui`
- application-specific components stay in consuming applications
- styling is encapsulated behind Codefox UI components

See [`AGENTS.md`](AGENTS.md) for repository working rules and [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidance.

## License

MIT
