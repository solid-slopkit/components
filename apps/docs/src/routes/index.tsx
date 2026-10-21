import { Title } from '@solidjs/meta';
import { Button } from '@solid-slopkit/components';
import { ArrowRight } from '@lucide/solid';
import { withBase } from '../base';

export default function Home() {
  return (
    <article class="docs-page">
      <Title>slopkit</Title>
      <h1>slopkit components</h1>
      <p class="docs-lead">Components for SolidJS 2 apps, styled with plain CSS and theme variables.</p>

      <Button as="a" href={withBase('/components/overview')} color="primary" rightSection={<ArrowRight />}>
        Get started
      </Button>
    </article>
  );
}
