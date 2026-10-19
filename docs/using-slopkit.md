# Using slopkit components in an app

This guide is for coding agents that add `@solid-slopkit/components` to a SolidJS 2.x app. It covers how to install it (it is not on npm), how to wire it up, and how to make the docs shipped in the package available to future agent sessions.

Repository: https://github.com/solid-slopkit/components

## The package

`@solid-slopkit/components` is the components, theming (CSS variables) and the `SlopkitUi` provider: layout, inputs, overlays, data display. It depends on no other `@solid-slopkit` package. Form state (`@solid-slopkit/forms`) and translations (`@solid-slopkit/i18n`) are separate packages that work with it through props: a forms binding fits an input, and i18n messages and the active locale go into components and the provider.

It needs `solid-js` and `@solidjs/web` 2.x, which a Solid 2 app already has. It ships uncompiled JSX under the `solid` export condition, so the app compiles it with its own Solid plugin (`@solidjs/vite-plugin`). This needs no configuration.

## 1. Find the version

Get the latest release tag (for example `v0.1.0`; the version is the tag without the `v`):

```bash
curl -s https://api.github.com/repos/solid-slopkit/components/releases/latest | grep '"tag_name"'
```

or, with the GitHub CLI:

```bash
gh release view --repo solid-slopkit/components --json tagName --jq .tagName
```

## 2. Install

The package is a tarball attached to the GitHub Release, at:

```
https://github.com/solid-slopkit/components/releases/download/v<version>/solid-slopkit-components-<version>.tgz
```

For example, with version `0.1.0`:

```bash
pnpm add https://github.com/solid-slopkit/components/releases/download/v0.1.0/solid-slopkit-components-0.1.0.tgz
```

If the app uses `@solid-slopkit/components/carousel`, also install its peer dependency, `embla-carousel`.

Once installed, the package is imported by name (`@solid-slopkit/components`), like any other dependency. `package.json` keeps the tarball URL as the version. pnpm's output prints `@solid-slopkit/components <version>` on later installs, but the URL in `package.json` is unchanged and needs no fixing.

## 3. Set it up

The package has an index for agents at `node_modules/@solid-slopkit/components/dist/source/llms.md`: setup, the API, and links to a reference for every component. Read it. The steps below are only the wiring that has to happen once.

Wrap the app's root component in the provider, and import the two stylesheets there once. In the `pnpm create solid` templates that is `src/App.tsx`, around the `<Router>`. Don't use `src/Document.tsx`: that is the HTML shell, and it ships no client JS.

```tsx
import { SlopkitUi } from '@solid-slopkit/components';
import '@solid-slopkit/components/styles/slopkit.css';
import '@solid-slopkit/components/styles/default-theme.css';

export default function App() {
  return (
    <SlopkitUi>
      <Router>{/* … */}</Router>
    </SlopkitUi>
  );
}
```

- Component rules sit in `@layer slopkit.components`, so any unlayered app CSS overrides them. The template's `src/App.css` styles `body`, `main` and links. Remove what the app doesn't need, or it will fight the theme.
- `@solid-slopkit/components` exports a `Title` component, and the templates already import `Title` from `@solidjs/meta` (the document title). Rename one of them on import where both are used: `import { Title as PageTitle } from '@solidjs/meta'`.

## 4. Make the package docs available to later sessions

The package ships skills (task guides, `skills/<area>/SKILL.md`) and LLM references (the `llms.md` index and the pages it links). Both always match the installed version. Tell future agents about them in the app's agent instructions: add this section to `AGENTS.md`. Create the file if the app has none. If the file has a generated block (the templates' `<!-- BEGIN solid-2.0-primer -->` … `<!-- END solid-2.0-primer -->`), add the section after it, never inside it.

```markdown
## slopkit components

This app uses `@solid-slopkit/components`, installed from a GitHub Release tarball (not npm). To upgrade, change the version in its URL in `package.json` and reinstall.

Read the docs inside the installed package, not the web; they match the installed version:

- `node_modules/@solid-slopkit/components/dist/source/llms.md`: one reference per component, the provider, theming. Skills: `node_modules/@solid-slopkit/components/skills/theming/SKILL.md`, `node_modules/@solid-slopkit/components/skills/layout/SKILL.md`.

Before working with a component, read the skill for the task first, then the reference for each component you use.
```

**Claude Code** reads `CLAUDE.md`, not `AGENTS.md`. If the app has no `CLAUDE.md`, create one that contains the line `@AGENTS.md`. To make the skills load on their own when a task matches them, also link each one into `.claude/skills`:

```bash
mkdir -p .claude/skills
for skill in node_modules/@solid-slopkit/*/skills/*/; do
  ln -sfn "../../$skill" ".claude/skills/$(sed -n 's/^name: //p' "$skill/SKILL.md")"
done
```

Commit the links. They are relative and point into `node_modules`, so they resolve after `pnpm install` on any clone and follow upgrades. Run the loop again after an upgrade, to pick up new skills.

## 5. Check it works

1. `pnpm build` succeeds, and `pnpm exec tsc --noEmit` reports no errors.
2. `pnpm dev`, open the app, and check that the components render with the theme applied and the browser console shows no errors.
