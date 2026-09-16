# Architecture Decision Records

Codefox UI records long-lived architecture and design decisions as ADRs.

## Status values

- `Proposed`
- `Accepted`
- `Superseded`
- `Deprecated`

## Naming

Use sequential filenames:

```text
0001-short-decision-title.md
0002-another-decision.md
```

When a decision changes, prefer a new ADR that explicitly supersedes the old one rather than rewriting history.

## Current decisions

- `0001` React + TypeScript + Vite
- `0002` shadcn/ui as upstream component source
- `0003` publish as `@codefoxpro/ui`
- `0004` keep application-specific components out of the library
- `0005` encapsulate styling behind Codefox UI components
- `0006` use semantic CSS custom properties for design tokens
- `0007` use Storybook for the component playground
- `0008` compose Card sections and header actions
- `0009` use SemVer release candidates and trusted npm publishing
