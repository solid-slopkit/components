# Context Map

slopkit is a family of packages for SolidJS 2.x. Each package is its own context with its own vocabulary and decisions, and lives in its own repository. This repository holds one of them: components. Read this file, then [packages/components/CONTEXT.md](./packages/components/CONTEXT.md).

## Contexts

- [Components](./packages/components/CONTEXT.md) (`@solid-slopkit/components`): components, their look, theming and the provider. Decisions in [packages/components/docs/adr](./packages/components/docs/adr), roadmap in [packages/components/docs/roadmap.md](./packages/components/docs/roadmap.md).
- Forms (`@solid-slopkit/forms`): schema-driven form state over a Solid store. In another repository.
- i18n (`@solid-slopkit/i18n`): translation files next to the code that uses them, and the active locale. In another repository.
- threejs (`@solid-slopkit/threejs`): three.js scenes described with Solid components inside a **Canvas**. In another repository.

Decisions that bind the whole family live in [docs/adr](./docs/adr): distribution (0001), dependencies (0002), browser baseline (0010), agent docs in the package (0012), no right-to-left support (0014) and package independence (0016). ADR numbers are unique across the family, so "ADR 0013" names one decision wherever it lives. A new ADR goes in `docs/adr` when it binds every package, otherwise in `packages/components/docs/adr`.

## Relationships

No package depends on another at runtime; they meet through props (ADR 0016).

- **Forms → Components**: a **Binding** (`bind(field)`) returns exactly the props an input takes. Components is a dev-only dependency of forms, for tests and demos.
- **i18n → Components**: **Messages** fill a component's built-in text props, and the **active locale** is passed to the **provider** for date and number formatting. The two providers don't know each other.
- **threejs ↔ Components**: none. DOM content from components sits next to the Canvas, not in it.

## Shared language

**Skill**:
A task-oriented guide for coding agents (`skills/<area>/SKILL.md`), shipped in the package.
_Avoid_: guide, recipe

**LLM reference**:
Handwritten Markdown for agents next to the source, shipped in the package: one page per component and provider. `llms.md` is the package's index.
_Avoid_: llms.txt (that is only the index), API docs
