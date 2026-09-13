# ADR-0004: Keep application-specific components out of Codefox UI

## Status

Accepted

## Context

A shared UI library becomes difficult to evolve when feature and business concepts from consuming applications are moved into it merely because they contain reusable-looking markup.

Codefox UI should provide reusable primitives and patterns, not become a shared feature layer.

## Decision

Only application-agnostic UI primitives and broadly reusable interaction patterns belong in Codefox UI.

Feature concepts such as `MeetupCard`, `RsvpSelector`, or application navigation belong in their consuming application unless a later concrete cross-application need demonstrates a truly generic abstraction.

New public APIs should be justified by a concrete consumer or a fundamental UI primitive rather than speculative reuse.

## Consequences

- Business language stays close to the application that owns it.
- Codefox UI remains smaller and easier to version.
- Some visual duplication between applications is acceptable until a real reusable abstraction emerges.
- Moving a component into Codefox UI requires removing application-specific semantics from its API.
