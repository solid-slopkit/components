import { For } from 'solid-js';
import { Title } from '@solidjs/meta';
import { CodeBlock } from '../../components/CodeBlock';
import { H2 } from '../../components/Heading';
import { nav } from '../../nav';
import { withBase } from '../../base';

// The same groups as the sidebar, so the two never drift apart.
const componentGroups = nav.find((section) => section.title === 'Components')?.groups ?? [];

export default function ComponentsOverview() {
  return (
    <article class="docs-page">
      <Title>Components · slopkit</Title>
      <p class="docs-eyebrow">Components</p>
      <h1>Overview</h1>
      <p class="docs-lead">
        <code>@solid-slopkit/components</code> is a component library for SolidJS 2, styled with plain CSS and CSS variables. No
        CSS-in-JS and no utility framework.
      </p>

      <H2 id="installation">Installation</H2>
      <p>
        Install <code>@solid-slopkit/components</code> from npm.
      </p>
      <CodeBlock lang="bash" code="pnpm add @solid-slopkit/components" />
      <p>
        It needs <code>solid-js</code> and <code>@solidjs/web</code> 2.x. The package ships uncompiled JSX, so the app must
        compile it with <code>@solidjs/vite-plugin</code>, the same way it compiles its own components.
      </p>

      <H2 id="styles">Styles</H2>
      <p>
        Import the base styles and a theme once, at the root of your app. The base file declares the cascade layers and color
        palettes. The theme sets the <code>--slp-color-*</code> tokens components read.
      </p>
      <CodeBlock
        code={`import '@solid-slopkit/components/styles/slopkit.css';
import '@solid-slopkit/components/styles/default-theme.css';`}
      />
      <p>
        Everything lives in <code>@layer slopkit.*</code> cascade layers, so your own unlayered CSS always wins without
        specificity fights.
      </p>

      <H2 id="usage">Usage</H2>
      <p>
        Wrap the app in <code>&lt;SlopkitUi&gt;</code> once. Components that generate CSS at runtime, such as Box, add it there.
      </p>
      <CodeBlock
        code={`import { SlopkitUi } from '@solid-slopkit/components';

export function Root() {
  return <SlopkitUi>{/* your app */}</SlopkitUi>;
}`}
      />
      <CodeBlock
        code={`import { Button } from '@solid-slopkit/components';

export function Toolbar() {
  return <Button color="primary">Save</Button>;
}`}
      />

      <H2 id="components">Components</H2>
      <For each={componentGroups}>
        {(group) => (
          <>
            <h3>{group.title}</h3>
            <ul>
              <For each={group.items}>
                {(item) => (
                  <li>
                    <a href={withBase(item.href)}>{item.title}</a>
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </For>
    </article>
  );
}
