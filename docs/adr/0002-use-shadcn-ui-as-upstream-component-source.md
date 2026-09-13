# ADR-0002: Use shadcn/ui as upstream component source material

## Status

Accepted

## Context

shadcn/ui provides well-designed component implementations and patterns while allowing applications to own the source code rather than depending on a closed component abstraction.

Codefox UI wants that ownership model while presenting its own stable public API to consumers.

## Decision

Use shadcn/ui as upstream source material and a design/component reference, not as a runtime abstraction exposed to consumers.

Components copied or adapted from shadcn/ui become Codefox UI source code and are reviewed against Codefox UI's API, accessibility, token, and styling conventions.

Underlying primitive libraries such as Radix may be introduced as runtime dependencies on a component-by-component basis when they provide justified behavior or accessibility value.

## Consequences

- Codefox UI can benefit from proven component patterns without making consumers depend on shadcn-specific project structure.
- We own and may adapt the component source.
- Upstream changes are adopted deliberately rather than automatically.
- Third-party attribution and license requirements must be preserved.
- Codefox UI, not shadcn/ui, defines the consumer-facing API.
