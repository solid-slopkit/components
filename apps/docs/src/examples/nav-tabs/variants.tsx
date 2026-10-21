import { createSignal, For } from 'solid-js';
import { NavTabs, Stack, type TabsVariant } from '@solid-slopkit/components';

const variants: TabsVariant[] = ['underline', 'outline', 'pills', 'soft'];
const links = ['Overview', 'Activity', 'Members'];

export default function Variants() {
  const [current, setCurrent] = createSignal('Overview');

  return (
    <Stack gap={6}>
      <For each={variants}>
        {(variant) => (
          <NavTabs
            variant={variant}
            color={variant === 'pills' || variant === 'soft' ? 'secondary' : 'primary'}
            aria-label={`${variant} links`}
          >
            <For each={links}>
              {(label) => (
                <NavTabs.Link
                  href={`#${label.toLowerCase()}`}
                  active={current() === label}
                  onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    setCurrent(label);
                  }}
                >
                  {label}
                </NavTabs.Link>
              )}
            </For>
          </NavTabs>
        )}
      </For>
    </Stack>
  );
}
