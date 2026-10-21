import { render } from '@solidjs/testing-library';
import type { JSX } from '@solidjs/web';
import { describe, expect, test } from 'vitest';
import { claimLinksAsCurrent } from '../../../../test/link-claims';
import { Tabs } from '../tabs';
import { NavTabs, type NavTabsProps } from './nav-tabs';

function setup(props: Partial<NavTabsProps> = {}, Link?: (props: { href: string; children?: JSX.Element }) => JSX.Element) {
  return render(() => (
    <div style={{ padding: '20px', width: '400px' }}>
      <NavTabs aria-label="Project" {...props}>
        <NavTabs.Link as={Link} href="#one" active>
          One
        </NavTabs.Link>
        <NavTabs.Link as={Link} href="#two">
          Two
        </NavTabs.Link>
        <NavTabs.Link as={Link} href="#three" disabled>
          Three
        </NavTabs.Link>
      </NavTabs>
    </div>
  ));
}

describe('<NavTabs /> in a browser', () => {
  test('the links look like tabs: the current one marked, the disabled one faded, no underline', () => {
    const { getByRole } = setup();
    const one = getComputedStyle(getByRole('link', { name: 'One' }));
    const two = getComputedStyle(getByRole('link', { name: 'Two' }));
    const three = getComputedStyle(getByRole('link', { name: 'Three' }));

    expect(one.boxShadow).toContain('inset');
    expect(two.boxShadow).toBe('none');
    expect(one.color).not.toBe(two.color);
    expect(two.textDecorationLine).toBe('none');
    expect(Number(three.opacity)).toBeLessThan(1);
  });

  test('a link is drawn like the tab of the same variant', () => {
    const links = setup({ variant: 'pills', size: 'lg' });
    const link = links.getByRole('link', { name: 'One' });
    const linkStyle = getComputedStyle(link);
    const look = [linkStyle.backgroundColor, linkStyle.color, linkStyle.borderTopLeftRadius, linkStyle.fontSize];
    const height = link.getBoundingClientRect().height;
    links.unmount();

    const { getByRole } = render(() => (
      <Tabs variant="pills" size="lg" defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    ));
    const tab = getByRole('tab');
    const tabStyle = getComputedStyle(tab);

    expect(look).toEqual([tabStyle.backgroundColor, tabStyle.color, tabStyle.borderTopLeftRadius, tabStyle.fontSize]);
    expect(height).toBe(tab.getBoundingClientRect().height);
  });

  test('a router marking every link leaves only the current one drawn as selected', () => {
    claimLinksAsCurrent();
    const RouterLink = (props: { href: string; children?: JSX.Element }) => <a {...props} href={props.href} />;
    const { getByRole } = setup({ variant: 'pills' }, RouterLink);

    expect(getByRole('link', { name: 'Two' })).toHaveAttribute('data-active');
    expect(getComputedStyle(getByRole('link', { name: 'Two' })).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(getComputedStyle(getByRole('link', { name: 'One' })).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('vertical links stack in a column', () => {
    const { getByRole } = setup({ orientation: 'vertical' });
    const one = getByRole('link', { name: 'One' }).getBoundingClientRect();
    const two = getByRole('link', { name: 'Two' }).getBoundingClientRect();

    expect(two.top).toBeGreaterThan(one.top);
    expect(two.left).toBe(one.left);
  });
});
