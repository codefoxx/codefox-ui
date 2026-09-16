# Releasing Codefox UI

Codefox UI is published as the public npm package `@codefoxpro/ui`.

## Versioning

Use Semantic Versioning. Before 1.0, incompatible API changes are still possible, but they remain explicit version changes rather than accidental drift.

Use release candidates for versions that should be consumable by real applications but are not yet ready to become the ordinary npm release:

```text
0.1.0-rc.1
0.1.0-rc.2
0.1.0
0.2.0-rc.1
0.2.0
```

Release candidates publish to the npm `next` dist-tag. Stable versions publish to `latest`.

Consumers can therefore choose explicitly:

```bash
npm install @codefoxpro/ui@next
npm install @codefoxpro/ui
```

## Preparing a release

1. Create a focused branch from `main`.
2. Change `package.json` to the exact version being prepared.
3. Run `npm run validate`.
4. Open and merge a pull request into `main`.
5. Create a GitHub Release targeting the merged `main` commit.
6. Tag the release as `v<package-version>`, for example `v0.1.0-rc.1`.
7. Generate/edit the GitHub release notes and publish the release.

Publishing the GitHub Release starts `.github/workflows/release.yml`. The workflow rejects a release when the tag does not exactly match `package.json`, when the tagged commit is not contained in `main`, or when the version does not match `x.y.z` / `x.y.z-rc.n`.

Before npm publication the workflow reruns lint, typecheck, tests, package build and Storybook build, then previews the package contents with `npm pack --dry-run`.

## npm trusted publishing

Normal releases authenticate to npm using GitHub Actions OIDC trusted publishing. No long-lived npm publish token is required. Trusted publishing also provides package provenance for this public repository/package.

Configure the package on npm with this trusted publisher after the package exists:

- provider: GitHub Actions
- GitHub owner: `codefoxx`
- repository: `codefox-ui`
- workflow filename: `release.yml`
- allow action: `npm publish`

The workflow runs on a GitHub-hosted runner and has `id-token: write`, which npm requires for OIDC trusted publishing.

### One-time first-package bootstrap

npm requires the package to exist before a trusted publisher can be configured. For the first publication only:

1. Create a short-lived granular npm token that is allowed to publish the new public package in the `codefoxpro` scope.
2. Add it as the GitHub Actions repository secret `NPM_BOOTSTRAP_TOKEN`.
3. Publish the first GitHub Release normally. The release workflow uses the bootstrap token only as an authentication fallback and still publishes with provenance.
4. Configure the trusted publisher described above on npm.
5. Delete the `NPM_BOOTSTRAP_TOKEN` GitHub secret and revoke the npm token.

After bootstrap, all releases authenticate through OIDC.

## Release notes

GitHub Releases are the changelog/release-note surface. Generate notes from merged pull requests and edit them when a release needs additional migration or compatibility guidance.

The npm package version and the GitHub Release tag are a one-to-one pair. Never reuse a published npm version.
