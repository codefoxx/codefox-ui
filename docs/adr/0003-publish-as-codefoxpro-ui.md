# ADR-0003: Publish as @codefoxpro/ui

## Status

Accepted

## Context

The Codefox brand is represented by `codefox.pro`, while the npm scopes `@codefox` and `@codefoxx` are unavailable for the project.

The npm organization `codefoxpro` is available and owned by the maintainer.

## Decision

Publish the public library as:

```text
@codefoxpro/ui
```

The repository and product remain branded as **Codefox UI**.

React and React DOM are peer dependencies. The package is public and MIT licensed.

## Consequences

- The npm package has a stable organization-owned namespace.
- The technical npm scope differs slightly from the product brand and GitHub account name.
- Consumers install the package with `npm install @codefoxpro/ui`.
- Package naming should not leak into component naming; components remain ordinary Codefox UI concepts.
