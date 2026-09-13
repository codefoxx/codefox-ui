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

Import the Codefox UI stylesheet once in the consuming application:

```ts
import "@codefoxpro/ui/styles.css";
```

## Design tokens and default theme

Codefox UI uses semantic CSS custom properties as its theming boundary. Components consume concepts such as `primary`, `danger`, `border`, and `focus` instead of depending on Tailwind-specific names or arbitrary values.

The semantic token contract is separate from the concrete default theme. The default theme keeps surfaces and text neutral while deriving its primary color from the orange family of the Codefox logo. Because Codefox UI is pre-1.0, concrete theme values may still be refined after reviewing real components together in the component playground.

Applications may override the defaults with standard CSS. Token names use the short `--cui-` namespace (`cui` = Codefox UI) to avoid collisions with application-owned variables without making component styles unnecessarily repetitive:

```css
:root {
  --cui-color-primary: #f7951e;
  --cui-color-primary-foreground: #1a1a1a;
  --cui-radius-md: 0.625rem;
}
```

The canonical custom-property names are also exported as the typed `themeTokens` map for code that needs to reference them without repeating string literals.

The initial vocabulary intentionally stays small and covers semantic colors, spacing, and radii. New tokens should be added only when a concrete reusable component needs them.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

### Component playground

Storybook is the local component playground and lightweight documentation surface.

```bash
npm run storybook
```

This starts Storybook on port `6006`. The Codefox default theme is loaded automatically, and the accessibility panel is available for story-level checks.

To verify the static Storybook build:

```bash
npm run build-storybook
```

Visual component and styling pull requests should be reviewed in Storybook before merge. The initial `Foundation/Design Tokens` story provides a visual reference until the first public component is added.

## Repository structure

```text
.storybook/           Storybook configuration
src/                 public library source and colocated stories
tests/               package-level tests
docs/adr/             architecture decision records
.github/workflows/    continuous integration
```

Stable public exports are added deliberately through `src/index.ts`. Storybook stories and playground-only helpers are not public package exports.

## Architecture

The initial architecture decisions are documented in [`docs/adr`](docs/adr/README.md):

- React + TypeScript + Vite
- shadcn/ui as upstream source material
- public package name `@codefoxpro/ui`
- application-specific components stay in consuming applications
- styling is encapsulated behind Codefox UI components
- semantic CSS custom properties provide the design-token boundary
- the Codefox default theme is separate from the token contract and starts from the logo's orange family plus neutral surfaces
- Storybook is the component playground and lightweight documentation surface

See [`AGENTS.md`](AGENTS.md) for repository working rules and [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidance.

## License

MIT
