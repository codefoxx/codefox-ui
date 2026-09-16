# Codefox UI

Reusable React UI primitives and patterns for Codefox projects.

The public npm package is:

```text
@codefoxpro/ui
```

> Codefox UI is currently pre-1.0 and under active development. Release candidates are published through the npm `next` dist-tag before they are promoted to an ordinary release.

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

Install the current ordinary release with:

```bash
npm install @codefoxpro/ui
```

To test the current release candidate explicitly:

```bash
npm install @codefoxpro/ui@next
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

## Components

### Button

`Button` is the first stable primitive. It keeps styling internal while preserving native button attributes and accessibility behavior.

```tsx
import { Button } from "@codefoxpro/ui";

<Button>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button variant="outline">Details</Button>
<Button variant="ghost">Dismiss</Button>
```

Supported variants are `primary`, `secondary`, `danger`, `outline`, and `ghost`. Supported sizes are `sm`, `md`, and `lg`. Buttons default to `type="button"`; opt into `type="submit"` explicitly when used to submit a form.

Buttons can also receive one controlled icon. Codefox UI owns icon placement, spacing, alignment, and sizing; consumers choose the icon content and its logical position.

```tsx
<Button icon={<SaveIcon />}>Save</Button>
<Button icon={<ArrowIcon />} iconPosition="end">Continue</Button>
```

`iconPosition` accepts `start` or `end` and defaults to `start`. Logical positions follow the inherited document/application direction automatically, so an application can set `dir="ltr"` or `dir="rtl"` once at a higher level instead of configuring every control.

### ButtonLink

Use `ButtonLink` for navigation that should share the Button visual language while preserving native anchor semantics.

```tsx
import { ButtonLink } from "@codefoxpro/ui";

<ButtonLink href="/meetups">View meetups</ButtonLink>
<ButtonLink href="/settings" variant="secondary">Settings</ButtonLink>
<ButtonLink href="https://example.com" target="_blank" rel="noreferrer">
  External destination
</ButtonLink>
```

Actions belong on `Button`; navigation belongs on `ButtonLink`. `ButtonLink` renders a real `<a>` and supports the same visual variants, sizes, and controlled icon API as `Button` while forwarding standard anchor attributes such as `target`, `rel`, and `download`.

### ActionBar

`ActionBar` arranges reusable action controls while keeping grouping, separators, logical direction, and responsive layout inside Codefox UI. Individual React controls and one level of action groups can be mixed in the same bar.

```tsx
import { ActionBar, Button, ButtonLink, type ActionBarItem } from "@codefoxpro/ui";

const actions = [
  <Button key="edit" variant="ghost">Edit</Button>,
  <ButtonLink key="details" href="/details" variant="outline">Details</ButtonLink>,
  {
    type: "group",
    separator: true,
    items: [
      <Button key="duplicate" variant="secondary">Duplicate</Button>,
      <Button key="delete" variant="danger">Delete</Button>,
    ],
  },
] satisfies readonly ActionBarItem[];

<ActionBar items={actions} />;
```

A group is a valid `ActionBar` item, but groups cannot contain other groups. `separator: true` inserts a Codefox UI-owned separator only between group actions. The bar inherits `dir="ltr"` / `dir="rtl"` from its surroundings and uses component-width responsiveness rather than viewport-only media queries. `ActionBar` is a layout primitive, not an ARIA `toolbar`; the contained controls keep their own native semantics.

### Card

`Card` is a composable surface with optional header, content, and footer sections.
Use an explicit `CardActions` as the last direct child of `CardHeader` for header
actions. It accepts the same typed `items` contract as `ActionBar`.

```tsx
import {
  Button, Card, CardHeader, CardTitle, CardDescription,
  CardActions, CardContent, CardFooter,
} from "@codefoxpro/ui";

<Card>
  <CardHeader>
    <div>
      <CardTitle>Project</CardTitle>
      <CardDescription>Manage the project details.</CardDescription>
    </div>
    <CardActions items={[
      <Button key="edit">Edit</Button>,
      { type: "group", separator: true, items: [
        <Button key="duplicate" variant="secondary">Duplicate</Button>,
        <Button key="delete" variant="danger">Delete</Button>,
      ] },
    ]} />
  </CardHeader>
  <CardContent>Any application content</CardContent>
  <CardFooter><small>Updated recently</small></CardFooter>
</Card>
```

The header owns layout: normal children occupy logical start and `CardActions`
occupies inline-end, inheriting the surrounding `dir`. Group related title and
description content in a `div` to keep them together alongside actions. Direct
title/description children are also supported.

Header actions stay on the same row as the title as the Card becomes narrower.
Wide cards render the full ActionBar. At compact widths, the first two actions stay
visible and later actions move into a vertical three-dots overflow control. At very
narrow widths only the overflow control remains. Source order therefore acts as the
initial responsive priority: put the actions that should remain visible longest
first. The compact overflow policy is currently Card-owned and is intended to move
into ActionBar once a reusable priority/overflow contract is introduced.

Set the card's available width on its surrounding layout, without positioning
actions or providing component styling props. An empty actions array renders no
controls; omit `CardActions` entirely when no action area is needed.

All sections are optional. `CardFooter` accepts arbitrary content, including an
explicit `ActionBar` if desired; there is no footer-specific actions API.
`CardTitle` renders an `h3` (native attributes such as `aria-level` can adapt its
accessible level). Card and its structural sections render neutral `div` elements
without introducing landmarks; label a region explicitly with `role="region"` and
`aria-labelledby` when appropriate.

The primitives forward native HTML attributes while keeping `className` and
`style` internal, matching Button's API convention. Their props types are public
exports, including `CardActionsProps`. Colors, spacing, and radii consume the
existing semantic `--cui-*` tokens. No additional dependencies or stylesheet setup
are required. Storybook **Primitives/Card** provides a fixed LTR/RTL Overview at
multiple widths and a Playground with controls for width, direction, text, and
optional sections/actions.

## Development

Requires Node.js 22 or newer.

```bash
npm install
npm run validate
```

`npm run validate` runs lint, typecheck, tests, the package build, and the static Storybook build.

### Component playground

Storybook is the local component playground and lightweight documentation surface.

```bash
npm run storybook
```

This starts Storybook on port `6006`. The Codefox default theme is loaded automatically, and the accessibility panel is available for story-level checks.

To verify the static Storybook build directly:

```bash
npm run build-storybook
```

Visual component and styling pull requests should be reviewed in Storybook before merge. The `Foundation/Design Tokens` story provides the theme reference, while component stories show real states and combinations.

## Releases

Codefox UI uses Semantic Versioning with explicit release candidates such as `0.1.0-rc.1`. Release candidates publish to npm `next`; ordinary releases publish to `latest`.

Publishing is performed by GitHub Actions from a GitHub Release whose `v<version>` tag matches `package.json` and whose commit is contained in `main`. The workflow reruns the complete validation suite before npm publication and uses npm trusted publishing/OIDC after the one-time package bootstrap.

See [`docs/releasing.md`](docs/releasing.md) for the release procedure and [`ADR-0009`](docs/adr/0009-use-semver-release-candidates-and-trusted-publishing.md) for the decision.

## Repository structure

```text
.storybook/           Storybook configuration
src/                 public library source and colocated stories
tests/               package-level tests
docs/adr/             architecture decision records
.github/workflows/    continuous integration and release automation
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
- SemVer release candidates and npm trusted publishing define the release path

See [`AGENTS.md`](AGENTS.md) for repository working rules and [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidance.

## License

MIT
