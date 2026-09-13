# ADR-0007: Use Storybook for the component playground

## Status

Accepted

## Context

Codefox UI needs a way to develop, inspect, and review reusable components in isolation before they are published and adopted by consuming applications.

The playground should make component states easy to compare, support accessibility checks, provide useful documentation close to the component source, and remain independent from the runtime package consumed by applications.

Three approaches were considered:

- **Storybook**: a mature component workshop with React/Vite integration, stories, controls, documentation, accessibility tooling, and a static build.
- **Ladle**: a smaller React-focused story viewer with lower tooling weight, but a narrower ecosystem and fewer integrated documentation and accessibility capabilities.
- **A custom Vite demo application**: minimal additional framework dependencies, but it would require Codefox UI to build and maintain its own navigation, state showcase conventions, documentation surface, and accessibility workflow.

## Decision

Use Storybook with the React/Vite framework as the Codefox UI component playground.

Keep the setup intentionally small:

- component and foundation stories live alongside the library source under `src/`
- the Codefox default stylesheet is loaded globally in Storybook
- the official accessibility addon is enabled
- the docs addon is enabled for lightweight generated component documentation
- `npm run storybook` starts the local playground
- `npm run build-storybook` verifies that the playground can be built statically

Until the first public component exists, a design-token story serves as the initial visual reference. It is not a public Codefox UI component and must not be exported from the package.

Visual component pull requests should be inspected in Storybook before merge. Build, infrastructure, and documentation pull requests do not require visual review unless they change rendered output.

## Consequences

- component states can be reviewed without starting a consuming application
- accessibility issues can be surfaced while developing and reviewing stories
- future components can document variants and interactions in the same place they are developed
- Storybook adds development dependencies and maintenance cost, but no runtime dependency for consumers of `@codefoxpro/ui`
- a static Storybook build can be hosted later if useful, but hosting is not required by this decision
- visual regression infrastructure remains a separate future decision
