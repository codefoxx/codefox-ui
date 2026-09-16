# ADR-0008: Compose Card sections and header actions

## Status

Accepted

## Context

Issue #4 establishes the initial composition convention for container primitives.
Consumers need flexible content while the library owns header action positioning.
ActionBar already owns action grouping and separators.

The first Card implementation stacked the complete action area below the title at
narrower widths. That keeps controls available, but produces a poor card header in
real use: the title loses its relationship with its actions and the action area can
consume more vertical space than the content it controls.

## Decision

Expose Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter and
CardActions as independent composable components. Structural parts forward native
attributes without className or style, following the existing Button convention.
CardActions accepts the same `items` contract as ActionBar.

Place CardActions as the last direct child of CardHeader. The header uses logical
CSS grid placement with ordinary content at start and actions at inline-end and
inherits the surrounding writing direction.

Card header actions remain on the same row as the heading while available width is
reduced. The initial responsive policy is deliberately pragmatic:

- wide cards render the complete ActionBar;
- compact cards keep the first two actions visible and move subsequent actions into
  a vertical three-dots overflow control;
- very narrow cards render only the overflow control;
- overflow is taken from the end of the source action order, so lower-priority
  actions can be supplied after higher-priority actions.

Grouped ActionBar items are flattened only for the compact/overflow presentation.
The full-width presentation continues to preserve normal ActionBar grouping and
separators.

The Card currently observes its own rendered width to select the responsive action
mode. This is intentionally a local implementation choice for the first usable Card,
not the final ownership model. The reusable responsive-overflow policy belongs in
ActionBar once its public API for action priority/overflow is designed. At that point
CardActions should return to being a thin ActionBar composition boundary.

Footer content remains unrestricted, with an optional explicitly composed ActionBar.
No new dependency or theme token is introduced.

## Consequences

- Consumers compose content instead of passing a card-wide configuration object.
- Related heading content can be grouped in a normal div, with no styling required.
- Header actions must be direct children; wrappers around CardActions are outside
  the supported composition contract.
- Source order currently doubles as responsive priority: actions later in the list
  overflow before actions earlier in the list.
- Card temporarily owns compact/overflow presentation until ActionBar gains a
  reusable overflow contract.
- CardTitle is an h3 by default; consumers choose appropriate accessible heading
  levels with native attributes. Sections do not introduce implicit landmarks.
