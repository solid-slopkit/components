---
'@solid-slopkit/components': minor
---

Button and ActionIcon now mark `active` (the pressed look) with `data-pressed` instead of `data-active`. A router writes `data-active` on every link it claims, and since Solid rc.15 that includes a Button or ActionIcon rendered `as="a"`, which made links to the current page look pressed. Update custom CSS that targets `.slp-button[data-active]` to `[data-pressed]`.
