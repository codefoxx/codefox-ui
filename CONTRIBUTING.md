# Contributing to Codefox UI

Codefox UI is intentionally small. Contributions should keep the library focused on reusable, application-agnostic UI.

## Before implementing

1. Start from an issue that explains the concrete need.
2. Confirm that the proposed API belongs in a shared UI library rather than a consuming application.
3. Check `docs/adr/` for relevant decisions.

## Development

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

Use a focused feature branch and open a pull request against `main`.

## Public API changes

Every new export becomes part of the compatibility surface of `@codefoxpro/ui`. Prefer a small API that can grow later over a speculative API that must be supported indefinitely.

Breaking changes require an explicit issue and rationale. During the pre-1.0 phase they may still happen, but they should never be accidental.

## Architecture

Long-lived technical and design decisions are recorded as ADRs in `docs/adr/`. If a change conflicts with an accepted ADR, make that conflict explicit and update the decision record rather than silently changing direction.
