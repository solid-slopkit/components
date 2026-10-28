---
'@solid-slopkit/components': minor
---

**Breaking:** `@solid-slopkit/i18n` is now a peer dependency; install it next to the components. `<SlopkitUi>` formats with the active locale of the nearest `<I18nProvider>` when its `locale` prop is not set, so an app that uses both sets the locale once, on the i18n provider. The `locale` prop still wins.
