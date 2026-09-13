# ADR-0006: Use semantic CSS custom properties for design tokens

## Status

Accepted

## Context

Codefox UI needs stable visual concepts that can be shared by components without coupling the public library API to Tailwind utility classes or another specific styling implementation.

The token system should remain small, support future theming, work with shadcn-derived component implementations, and leave room to replace the internal styling technology later.

The semantic token contract and the concrete Codefox default theme are separate concerns: the former defines which visual roles exist, while the latter assigns actual values to those roles.

## Decision

Use namespaced semantic CSS custom properties as the design-token boundary.

The initial token vocabulary covers:

- semantic colors: background, foreground, surface, primary, secondary, muted, danger, border, and focus, including paired foreground tokens where contrast is part of the semantic role
- a small spacing scale
- a small radius scale

Token names use the `--cui-` prefix (`cui` = Codefox UI). This is short enough to keep component styles readable while still separating library-owned variables from application-owned CSS custom properties. A typed `themeTokens` map exposes the canonical custom-property names for code that needs to reference a token without repeating string literals.

Codefox UI ships a default theme separately from the token contract. The default theme uses neutral surfaces and text, with the primary color derived from the orange family of the Codefox logo. Exact pre-1.0 theme values remain intentionally adjustable as real components are reviewed together in the component playground.

Consumers may override token values in CSS to theme the library without depending on Tailwind. Component implementations should use semantic tokens instead of arbitrary visual values whenever a suitable token exists. Tailwind may map to these variables internally, but Tailwind-specific names are not part of the token API.

## Consequences

- consumers can theme Codefox UI with standard CSS custom properties
- components can share visual decisions without hard-coding arbitrary values
- the semantic token contract is independent from the concrete Codefox default theme
- the default theme has a recognizable Codefox identity without using brand colors for every surface
- shadcn/Tailwind-based implementations can consume the same semantic variables
- token names become a compatibility surface and should change deliberately
- default theme values may be refined before 1.0 based on real visual review
- the initial token set stays intentionally small; new tokens require a concrete reusable need
- this decision does not require a dark theme or a particular future styling library
