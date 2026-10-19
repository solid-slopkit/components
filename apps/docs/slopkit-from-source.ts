import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const librarySource = fileURLToPath(new URL('../../packages/components/src/index.ts', import.meta.url));
const carouselSource = fileURLToPath(new URL('../../packages/components/src/carousel/index.ts', import.meta.url));
const datesSource = fileURLToPath(new URL('../../packages/components/src/dates/index.ts', import.meta.url));
const primitivesSource = fileURLToPath(new URL('../../packages/components/src/primitives/index.ts', import.meta.url));
const slopkitStylesCss = fileURLToPath(new URL('../../packages/components/src/styles/slopkit.css', import.meta.url));
const slopkitThemeCss = fileURLToPath(new URL('../../packages/components/src/styles/default-theme.css', import.meta.url));

export function slopkitFromSource(): Plugin {
  return {
    name: 'slopkit-from-source',
    apply: 'serve',
    enforce: 'pre',
    resolveId(id) {
      if (id === '@solid-slopkit/components') return librarySource;
      if (id === '@solid-slopkit/components/carousel') return carouselSource;
      if (id === '@solid-slopkit/components/dates') return datesSource;
      if (id === '@solid-slopkit/components/primitives') return primitivesSource;
      if (id === '@solid-slopkit/components/styles/slopkit.css') return slopkitStylesCss;
      if (id === '@solid-slopkit/components/styles/default-theme.css') return slopkitThemeCss;
    },
  };
}
