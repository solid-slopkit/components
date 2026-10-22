---
'@solid-slopkit/components': minor
---

Combobox has a search field for the dropdown: `Combobox.Search`, for a target that can't take text, such as a button. It takes focus when the dropdown opens, makes the selected option active (else the first), takes the same keys as the target, and makes the first option active as you type. Closing brings focus back to the target, and focus leaving the dropdown closes it. Its box has the class `.slp-combobox-search` (slot `combobox-search`).
