# Codefox UI - Agent Instructions

## Purpose

Codefox UI is a small, reusable React UI library for Codefox applications. It provides application-agnostic UI primitives and reusable patterns through the public npm package `@codefoxpro/ui`.

## Core principles

- Keep the public API small, intentional, and easy to compose.
- Prefer composition over large configuration objects or broad variant matrices.
- Accessibility is part of component correctness.
- Application-specific concepts do not belong in this repository.
- Add reusable APIs because a concrete consumer needs them, not because they might be useful someday.
- shadcn/ui is upstream source material and a design reference. Codefox UI owns copied or adapted component code.
- Styling is an implementation detail. Do not require consumers to write Tailwind utility classes in order to use Codefox UI components.
- Prefer semantic design tokens over arbitrary values in component implementations.
- Avoid architecture astronauting. Solve the current reusable UI problem with the smallest durable abstraction.

## Workflow

- Work starts from a GitHub issue with an explicit scope.
- Use a focused branch such as `feat/...`, `fix/...`, or `chore/...`.
- Do not push directly to `main`.
- Keep unrelated cleanup out of feature pull requests.
- Pull requests are squash merged.
- `main` must remain releasable.
- Before requesting review, run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

## Architecture decisions

Architectural decisions belong in `docs/adr/`.

Create or amend an ADR when a change affects long-term direction such as:

- public component API conventions
- styling strategy
- design tokens and theming
- package structure or publishing
- accessibility conventions
- testing strategy
- upstream component/tooling choices

Do not silently contradict an accepted ADR. Call out the conflict and supersede or amend the previous decision explicitly.

## Components

- Keep primitives application-agnostic.
- Keep business and feature components in consuming applications.
- Prefer native semantic HTML and accessible primitives.
- Keep props typed and deliberately small.
- Avoid exposing implementation-specific class names or styling technology as required consumer API.
- Preserve upstream attribution and license requirements when adapting third-party source code.

## Storybook

Storybook is the visual review, interaction, and accessibility surface for components. Prefer Storybook-native capabilities over custom story infrastructure.

- Use a static `Overview` story for visual comparison of variants, sizes, disabled states, surfaces, and other intentionally fixed states. The overview is for review, not for interaction through Controls.
- Use a dedicated `Playground` story for one configurable component instance. Expose meaningful public props through Storybook Controls instead of creating one story per simple variant.
- Use the Storybook Actions panel for observable callbacks such as `onClick`, `onOpenChange`, or `onSelect` rather than building custom event logging UI.
- Use Storybook interaction tests / `play` functions for behavior such as click, keyboard activation, focus, disabled behavior, open/close flows, and focus management.
- Use the Storybook Accessibility panel as part of reviewing every interactive component.
- Add separate stories only when they represent a useful visual comparison, distinct state, or real interaction scenario. Do not duplicate simple variants that Controls already cover.
- Consult the current Storybook documentation before introducing custom playground, actions, interaction, or accessibility mechanisms.

## Tests

- Add focused tests for public behavior and accessibility-relevant interaction.
- Do not test implementation details solely to increase coverage.
- A component is not complete when its public behavior is untested.

## Public exports

- Add stable exports deliberately through `src/index.ts`.
- Treat every exported name as a compatibility commitment.
- Do not export internal helpers by default.

## Language

Use English for code, comments, documentation, issues, branch names, commit messages, and pull requests.
