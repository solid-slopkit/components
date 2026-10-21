---
'@solid-slopkit/components': minor
---

NavLink and AppShell's MenuButton and MenuSubButton follow `@solidjs/router` like NavTabs: a link the router marks with `data-active` is drawn as current, and the router's `aria-current="page"` is left as it sets it. **Breaking:** they no longer take `active` or set `data-current` and `aria-current="false"`. Without the router, or on a button row, set `data-active` and `aria-current="page"` yourself. The router marks a link to a parent path on its child pages too, so give each link its own path.
