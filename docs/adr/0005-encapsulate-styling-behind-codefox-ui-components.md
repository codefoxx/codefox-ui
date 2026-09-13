# ADR-0005: Encapsulate styling behind Codefox UI components

## Status

Accepted

## Context

Tailwind CSS is productive and aligns well with shadcn-derived source, but utility-class strings are an implementation technique rather than a desirable application-facing API.

Codefox UI should preserve the freedom to evolve its styling implementation without forcing every consuming application to be rewritten.

## Decision

Treat styling technology as an internal implementation detail of Codefox UI components.

Tailwind may be used initially where it is the pragmatic choice for shadcn-derived components, but consumers should interact with semantic component APIs and design tokens rather than being required to provide Tailwind utility strings.

The library will evaluate stronger typed styling approaches only when concrete experience justifies a change. A complete styling-system replacement is not part of the initial bootstrap.

## Consequences

- Applications primarily consume components rather than styling primitives.
- Tailwind can remain useful internally without defining the public architecture.
- Semantic tokens become the preferred boundary for theming and visual decisions.
- A future migration to another styling implementation remains possible behind stable component APIs.
- Escape hatches such as `className` require deliberate API decisions rather than being assumed for every component.
