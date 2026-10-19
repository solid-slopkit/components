# slopkit components

[`@solid-slopkit/components`](./packages/components): a component library for SolidJS 2.x, with theming through CSS variables and a provider.

[`apps/docs`](./apps/docs) is the documentation site. [CONTEXT-MAP.md](./CONTEXT-MAP.md) explains how the package relates to the other `@solid-slopkit` packages, and [AGENTS.md](./AGENTS.md) is the guide for coding agents.

## Installing

The package isn't published to npm. Each version is a tarball attached to a [GitHub Release](https://github.com/solid-slopkit/components/releases) tagged `v<version>` (ADR 0001). [docs/using-slopkit.md](./docs/using-slopkit.md) is the setup guide for coding agents: point an agent at it to install and wire up the package in an app. To install by hand:

```bash
pnpm add https://github.com/solid-slopkit/components/releases/download/v0.1.0/solid-slopkit-components-0.1.0.tgz
```

## Developing

Node comes from `mise.toml` (`mise install`), and pnpm 12 runs the workspace:

```bash
pnpm install
pnpm dev            # the docs site
pnpm test           # the package's and the docs' tests
pnpm lint
pnpm format:check
```

## Releasing

[Changesets](https://github.com/changesets/changesets) sets the version. A release is the commit that applies the changesets, plus a `v<version>` tag that starts [`.github/workflows/release.yml`](./.github/workflows/release.yml).

An agent can run the whole release with the `release` skill (`.claude/skills/release/SKILL.md`), and it asks before committing, tagging or pushing. By hand:

1. **Record changes as you go.** In the pull request that makes a change, run `pnpm changeset`, pick the bump (`patch`, `minor`, `major`), and write one line for the changelog. Commit the generated `.changeset/*.md` file with the change.
2. **Apply the changesets.** On an up-to-date `main` with a clean tree:

   ```bash
   pnpm changeset version
   ```

   This sets the new version in the package, writes its `CHANGELOG.md` and deletes the applied changesets. Review the diff.

3. **Check it locally** (the workflow runs the same checks, so this only saves a round trip):

   ```bash
   pnpm format:check && pnpm lint && pnpm release:pack && pnpm -r --filter "./packages/*" typecheck && pnpm test
   ```

4. **Commit, tag and push.**

   ```bash
   git add -A
   git commit -m "chore: release v0.2.0"
   git tag v0.2.0
   git push origin main v0.2.0
   ```

5. **Watch the workflow.** It checks that the tag matches the package's version and that no changesets are left unapplied, runs every check, packs the package, and creates the GitHub Release with the tarball and the changelog section as notes:

   ```bash
   gh run watch "$(gh run list --workflow release.yml --limit 1 --json databaseId --jq '.[0].databaseId')"
   gh release view v0.2.0
   ```

If the workflow fails, nothing is published. Fix the cause on `main`, then move the tag to the fixed commit (`git tag -f v0.2.0 && git push -f origin v0.2.0`), or bump to a new version if the tag was already shared.
