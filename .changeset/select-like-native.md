---
'@solid-slopkit/components': minor
---

Select behaves like a native select: the field is always a button, choosing the selected option again keeps it without calling `onChange`, and the check mark on the selected option moves to the end of the row. **Breaking:** Select no longer takes `searchable`, `clearable`, `clearLabel`, `allowDeselect` or `nothingFoundMessage`, and drops the `select-clear` slot. `onChange` is now `(value: string, item: SelectItem) => void`, since the select can't clear its value; a controlled `value` of `null` still shows the placeholder. To filter a list by typing, build the picker from Combobox.
