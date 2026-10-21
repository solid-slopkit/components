---
'@solid-slopkit/components': minor
---

NavTabs follows `@solidjs/router`: a link the router marks with `data-active` is drawn as the selected tab, and the router's `aria-current="page"` is left as it sets it. **Breaking:** NavTabs.Link no longer takes `active` or sets `data-current` and `aria-current="false"`; without the router, set `data-active` and `aria-current="page"` on the current link yourself. The router marks a link to a parent path on its child pages too, so give each tab its own path.
