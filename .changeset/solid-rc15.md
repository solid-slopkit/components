---
'@solid-slopkit/components': patch
---

Requires `solid-js` and `@solidjs/web` 2.0.0-rc.15 or later.

- A Checkbox or Switch without a `value` now submits `on`, as documented. rc.15 leaves out an empty `value` attribute.
- A writable derived signal applies a write first and re-runs its function on the next source change (since rc.14). `Burger` and `PasswordInput` are tested against that order.
