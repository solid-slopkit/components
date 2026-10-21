import { createSignal, For } from 'solid-js';
import { Activity, LayoutDashboard, Settings, Users } from '@lucide/solid';
import { Badge, NavTabs } from '@solid-slopkit/components';

const links = [
  { href: '#overview', label: 'Overview', icon: LayoutDashboard },
  { href: '#activity', label: 'Activity', icon: Activity, count: 3 },
  { href: '#members', label: 'Members', icon: Users },
];

export default function Basic() {
  const [current, setCurrent] = createSignal('#overview');

  return (
    <NavTabs aria-label="Project">
      <For each={links}>
        {(link) => (
          <NavTabs.Link
            href={link.href}
            leftSection={<link.icon />}
            rightSection={link.count ? <Badge size="xs">{link.count}</Badge> : undefined}
            active={current() === link.href}
            onClick={(event: MouseEvent) => {
              event.preventDefault();
              setCurrent(link.href);
            }}
          >
            {link.label}
          </NavTabs.Link>
        )}
      </For>
      <NavTabs.Link href="#settings" leftSection={<Settings />} disabled>
        Settings
      </NavTabs.Link>
    </NavTabs>
  );
}
