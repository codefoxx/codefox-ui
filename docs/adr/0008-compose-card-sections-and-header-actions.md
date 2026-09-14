# ADR-0008: Compose Card sections and header actions

## Status

Accepted

## Context

Issue #4 establishes the initial composition convention for container primitives.
Consumers need flexible content while the library owns header action positioning.
ActionBar already owns action grouping, separators and width responsiveness.

## Decision

Expose Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter and
CardActions as independent composable components. Structural parts forward native
attributes without className or style, following the existing Button convention.
CardActions accepts ActionBarProps and delegates directly to ActionBar.

Place CardActions as the last direct child of CardHeader. The header uses logical
CSS grid placement with ordinary content at start and actions at inline-end. It
inherits direction and stacks at narrow card container widths. Allocate a definite
fractional actions track because ActionBar uses inline-size containment and cannot
provide an intrinsic width to an auto-sized track. ActionBar's own container remains
responsible for the arrangement of its controls. No React child inspection or
context is necessary; the direct-child composition contract is documented.

Footer content remains unrestricted, with an optional explicitly composed ActionBar.
Card introduces no menu/overflow behavior, new dependencies, or theme tokens.

## Consequences

- Consumers compose content instead of passing a card-wide configuration object.
- Related heading content can be grouped in a normal div, with no styling required.
- Header actions must be direct children; wrappers around CardActions are outside
  the supported composition contract.
- CardTitle is an h3 by default; consumers choose appropriate accessible heading
  levels with native attributes. Sections do not introduce implicit landmarks.
- Container and action responsiveness remain independently owned and testable.
