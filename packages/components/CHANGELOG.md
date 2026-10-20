# @solid-slopkit/components

## 0.2.0

### Minor Changes

- 6291dd2: Button and ActionIcon now mark `active` (the pressed look) with `data-pressed` instead of `data-active`. A router writes `data-active` on every link it claims, and since Solid rc.15 that includes a Button or ActionIcon rendered `as="a"`, which made links to the current page look pressed. Update custom CSS that targets `.slp-button[data-active]` to `[data-pressed]`.

### Patch Changes

- The package no longer ships the SSR test fixtures (`*.fixtures`), which added 240 files to `dist`.
- 956a5b9: Requires `solid-js` and `@solidjs/web` 2.0.0-rc.15 or later.

  - A Checkbox or Switch without a `value` now submits `on`, as documented. rc.15 leaves out an empty `value` attribute.
  - A writable derived signal applies a write first and re-runs its function on the next source change (since rc.14). `Burger` and `PasswordInput` are tested against that order.

- daabb60: Document the dev-only unstyled flash in apps that render on the server with `@solidjs/vite-plugin` start mode, and the `start.css.filter.include` setting that fixes it.

## 0.1.0

### Minor Changes

- The default theme is now neutral: grey base colors and a near-black primary (near-white in dark mode), with violet kept as the secondary. Its colors are written in `oklch`, and it sets `--slp-heading-weight` to 700. Apps that relied on the blue primary can set `--slp-color-primary` and `--slp-color-primary-content` in their own theme.

### Patch Changes

- efe740e: SegmentedControl mounted in a hidden container (a closed tab or modal) no longer shows its indicator sliding in from the first option once it is shown, and no longer reports an untracked read when its props come from an inline spread such as `{...bind(f.x)}`. Forms adds `bind.nativeSelect(f)` for `NativeSelect`, whose `onChange` stays the native event, and the binding guide now has a row for every ui input. The ui LLM index describes every entry and has a guide to picking a single-value input; the Select and NativeSelect references say when to choose the other.

## 0.0.1

### Patch Changes

- First release: a component library for SolidJS 2.x, styled with plain CSS and CSS variables. Layout, buttons, inputs, overlays, navigation, feedback and data display components, with a provider, themes and color schemes; dates at `/dates`, a carousel at `/carousel` and behavior primitives at `/primitives`. Ships its LLM references and skills.
