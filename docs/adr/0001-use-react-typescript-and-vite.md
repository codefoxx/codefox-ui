# ADR-0001: Use React, TypeScript, and Vite

## Status

Accepted

## Context

Codefox UI needs a small component model that matches its first consumer, RW4U Meetups, while remaining straightforward to package as a public npm library.

## Decision

Use React and TypeScript for the public component model and Vite for library builds.

React remains a peer dependency so consuming applications own the React runtime. Type declarations are emitted as part of the package build.

## Consequences

- Codefox UI integrates naturally with React applications such as RW4U Meetups.
- Consumers get typed component APIs.
- React is not bundled into the package.
- Vite is build tooling, not part of the consumer-facing runtime API.
- Supporting non-React UI frameworks is out of scope unless a concrete future requirement justifies a separate package or architecture.
