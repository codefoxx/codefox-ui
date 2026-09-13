# ADR-0006: Use semantic CSS custom properties for design tokens

## Status

Accepted

## Context

Codefox UI needs stable visual concepts that can be shared by components without coupling the public library API to Tailwind utility classes or another specific styling implementation.

The token system should remain small, support future theming, work with shadcn-derived component implementations, and leave room to replace the internal styling technology later.

## Decision

Use namespaced semantic CSS custom properties as the design-token boundary.

The initial token vocabulary covers:

- semantic colors: background, foreground, surface, primary, secondary, muted, danger, border, and focus, including paired foreground tokens where contrast is part of the semantic role
- a small spacing scale
- a small radius scale

Token names use the `--codefox-` prefix. Codefox UI ships default values through its public stylesheet. Consumers may override token values in CSS to theme the library without depending on Tailwind.

A typed `themeTokens` map exposes the canonical custom-property names for code that needs to reference a token without repeating string literals.

Component implementations should use semantic tokens instead of arbitrary visual values whenever a suitable token exists. Tailwind may map to these variables internally, but Tailwind-specific names are not part of the token API.

## Consequences

- consumers can theme Codefox UI with standard CSS custom properties
- components can share visual decisions without hard-coding arbitrary values
- shadcn/Tailwind-based implementations can consume the same semantic variables
- the token names become a compatibility surface and should change deliberately
- the initial token set stays intentionally small; new tokens require a concrete reusable need
- this decision does not require a dark theme or a particular future styling library
