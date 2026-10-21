import { fireEvent, render } from '@solidjs/testing-library';
import { captureArtifact } from '@solidjs/diagnostics';
import { createSignal, flush } from 'solid-js';
import type { JSX } from '@solidjs/web';
import axe from 'axe-core';
import { describe, expect, test, vi } from 'vitest';
import { expectHydration } from '../../../../test/ssr';
import { NO_DIAGNOSTICS } from '../../../../test/diagnostics';
import { claimLinksAsCurrent } from '../../../../test/link-claims';
import { NavTabs } from './nav-tabs';

describe('<NavTabs />', () => {
  test('a nav of links, with their sections', () => {
    const { getByRole, getAllByRole, container } = render(() => (
      <NavTabs aria-label="Project" class="mine">
        <NavTabs.Link href="/" leftSection={<svg />} class="link">
          Overview
        </NavTabs.Link>
        <NavTabs.Link href="/activity" rightSection={<span>3</span>}>
          Activity
        </NavTabs.Link>
      </NavTabs>
    ));
    const nav = getByRole('navigation', { name: 'Project' });
    const [overview, activity] = getAllByRole('link');

    expect(nav).toHaveClass('slp-nav-tabs', 'mine');
    expect(nav).toHaveAttribute('data-variant', 'underline');
    expect(nav).toHaveAttribute('data-color', 'primary');
    expect(nav).toHaveAttribute('data-size', 'md');
    expect(nav).toHaveAttribute('data-orientation', 'horizontal');
    expect(container.querySelector('[data-slot="nav-tabs-list"]')).toContainElement(overview);
    expect(overview).toHaveClass('slp-nav-tabs-link', 'link');
    expect(overview).toHaveAttribute('href', '/');
    expect(overview).toHaveAttribute('aria-current', 'false');
    expect(overview.querySelector('[data-slot="nav-tabs-link-section"][data-position="left"] svg')).not.toBeNull();
    expect(overview.querySelector('[data-slot="nav-tabs-link-label"]')).toHaveTextContent('Overview');
    expect(overview.querySelector('[data-position="right"]')).toBeNull();
    expect(activity.querySelector('[data-position="right"]')).toHaveTextContent('3');
    expect(container.querySelector('[role="tablist"], [role="tab"]')).toBeNull();
  });

  test('variant, color, size, orientation and grow', () => {
    const { getByRole, container } = render(() => (
      <NavTabs variant="soft" color="accent" size="lg" orientation="vertical" grow>
        <NavTabs.Link href="/">Home</NavTabs.Link>
      </NavTabs>
    ));
    const nav = getByRole('navigation');

    expect(nav).toHaveAttribute('data-variant', 'soft');
    expect(nav).toHaveAttribute('data-color', 'accent');
    expect(nav).toHaveAttribute('data-size', 'lg');
    expect(nav).toHaveAttribute('data-orientation', 'vertical');
    expect(container.querySelector('[data-slot="nav-tabs-list"]')).toHaveAttribute('data-grow', '');
  });

  test('active marks the current page', () => {
    const [active, setActive] = createSignal(true);
    const { getByRole } = render(() => (
      <NavTabs>
        <NavTabs.Link href="/" active={active()}>
          Home
        </NavTabs.Link>
      </NavTabs>
    ));
    const link = getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-current', '');
    setActive(false);
    flush();
    expect(link).toHaveAttribute('aria-current', 'false');
    expect(link).not.toHaveAttribute('data-current');
  });

  test('keeps its own current state when a router marks every link to this page', () => {
    claimLinksAsCurrent();
    // A link component that renders its own `a`, which the runtime claims, as a router's would.
    const RouterLink = (props: { href: string; children?: JSX.Element }) => <a {...props} href={props.href} />;
    const { getByRole } = render(() => (
      <NavTabs>
        <NavTabs.Link as={RouterLink} href="#home">
          Home
        </NavTabs.Link>
      </NavTabs>
    ));
    const link = getByRole('link', { name: 'Home' });

    expect(link).toHaveAttribute('aria-current', 'false');
    expect(link).not.toHaveAttribute('data-current');
  });

  test('a disabled link has no href, says it is disabled, and ignores clicks', () => {
    const onClick = vi.fn();
    const { getByRole } = render(() => (
      <NavTabs>
        <NavTabs.Link href="/settings" disabled active onClick={onClick}>
          Settings
        </NavTabs.Link>
      </NavTabs>
    ));
    const link = getByRole('link', { name: 'Settings' });

    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('data-disabled', '');
    expect(link).toHaveAttribute('aria-current', 'false');
    expect(fireEvent.click(link)).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('as renders another link component', () => {
    const RouterLink = (props: { href: string; children?: JSX.Element; class?: string }) => <a {...props} data-router="" />;
    const { getByRole } = render(() => (
      <NavTabs>
        <NavTabs.Link as={RouterLink} href="/settings">
          Settings
        </NavTabs.Link>
      </NavTabs>
    ));
    const link = getByRole('link', { name: 'Settings' });

    expect(link).toHaveAttribute('data-router', '');
    expect(link).toHaveAttribute('href', '/settings');
    expect(link).toHaveClass('slp-nav-tabs-link');
  });

  test('has no axe violations', async () => {
    const { container } = render(() => (
      <NavTabs aria-label="Project">
        <NavTabs.Link href="/" active>
          Overview
        </NavTabs.Link>
        <NavTabs.Link href="/activity">Activity</NavTabs.Link>
        <NavTabs.Link href="/settings" disabled>
          Settings
        </NavTabs.Link>
      </NavTabs>
    ));
    expect((await axe.run(container)).violations).toEqual([]);
  });

  test('moving the current page has no diagnostics or waste', async () => {
    const [current, setCurrent] = createSignal('/');
    render(() => (
      <NavTabs>
        <NavTabs.Link href="/" active={current() === '/'}>
          Overview
        </NavTabs.Link>
        <NavTabs.Link href="/activity" active={current() === '/activity'}>
          Activity
        </NavTabs.Link>
      </NavTabs>
    ));

    const { artifact } = await captureArtifact(
      () => {
        setCurrent('/activity');
        flush();
      },
      { scenario: 'nav-tabs-current' },
    );

    expect(artifact).toHaveNoDiagnostics(NO_DIAGNOSTICS);
    expect(artifact).toHaveNoWaste();
  });

  test('hydrates the server render without mismatches or diagnostics', async () => {
    await expectHydration('./nav-tabs.fixtures.tsx', 'navTabs');
  });
});
