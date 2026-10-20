---
'@solid-slopkit/components': patch
---

Requires `solid-js` and `@solidjs/web` 2.0.0-rc.14 or later. In rc.14 a write to a writable derived signal lands first and the function re-runs on the next source change. `Burger` and `PasswordInput` are tested against that order.
