import { StrictMode, type FormEvent } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '.';
import { uiTest } from '../../tests';

describe('Tabs 컴포넌트', () => {
  uiTest(Tabs, 'Tabs');

  it.each(['primary', 'secondary'] as const)(
    'initially hides the list indicator for %s tabs.',
    (variant) => {
      render(
        <StrictMode>
          <Tabs defaultValue={1} variant={variant}>
            <TabsList>
              <TabsTrigger value={1}>Trigger1</TabsTrigger>
              <TabsTrigger value={2}>Trigger2</TabsTrigger>
            </TabsList>
          </Tabs>
        </StrictMode>,
      );

      expect(
        screen.getByRole('tablist').querySelector(':scope > div'),
      ).toHaveStyle({ display: 'none' });
      expect(
        screen.getByRole('tab', { name: 'Trigger1' }).querySelector('div'),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('tab', { name: 'Trigger2' }).querySelector('div'),
      ).toBeNull();
    },
  );

  it.each(['primary', 'secondary'] as const)(
    'shows and hides the same %s list indicator while switching tabs.',
    (variant) => {
      render(
        <Tabs defaultValue={1} variant={variant}>
          <TabsList>
            <TabsTrigger value={1}>Trigger1</TabsTrigger>
            <TabsTrigger value={2}>Trigger2</TabsTrigger>
          </TabsList>
        </Tabs>,
      );

      const tabList = screen.getByRole('tablist');
      const indicator = tabList.querySelector(':scope > div');
      const firstTab = screen.getByRole('tab', { name: 'Trigger1' });
      const secondTab = screen.getByRole('tab', { name: 'Trigger2' });
      Object.defineProperties(firstTab, {
        offsetLeft: { value: 0 },
        offsetWidth: { value: 80 },
      });
      Object.defineProperties(secondTab, {
        offsetLeft: { value: 80 },
        offsetWidth: { value: 120 },
      });

      for (const tab of [secondTab, firstTab]) {
        fireEvent.click(tab);

        expect(tabList.querySelector(':scope > div')).toBe(indicator);
        expect(indicator).toHaveStyle({ display: 'block' });
        fireEvent.transitionEnd(indicator!);

        expect(tabList.querySelector(':scope > div')).toBe(indicator);
        expect(indicator).toHaveStyle({ display: 'none' });
        expect(tab.querySelector('div')).toBeInTheDocument();
      }
    },
  );

  it('disables all triggers and restores their individual states when enabled.', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const renderTabs = (disabled: boolean) => (
      <Tabs defaultValue={1} disabled={disabled} onChange={handleChange}>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger disabled={false} value={2} onClick={handleClick}>
            Trigger2
          </TabsTrigger>
          <TabsTrigger value={3} disabled>
            Trigger3
          </TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>
    );
    const { rerender } = render(renderTabs(true));

    screen.getAllByRole('tab').forEach((tab) => expect(tab).toBeDisabled());
    await user.click(screen.getByRole('tab', { name: 'Trigger2' }));

    expect(handleChange).not.toHaveBeenCalled();
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content1');

    rerender(renderTabs(false));

    expect(screen.getByRole('tab', { name: 'Trigger1' })).toBeEnabled();
    expect(screen.getByRole('tab', { name: 'Trigger2' })).toBeEnabled();
    expect(screen.getByRole('tab', { name: 'Trigger3' })).toBeDisabled();
    await user.click(screen.getByRole('tab', { name: 'Trigger2' }));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(2);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content2');
  });

  it('skips an individually disabled trigger for clicks and keyboard focus.', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    render(
      <Tabs defaultValue={1} onChange={handleChange}>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2} disabled onClick={handleClick}>
            Trigger2
          </TabsTrigger>
          <TabsTrigger value={3}>Trigger3</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
        <TabsContent value={3}>Content3</TabsContent>
      </Tabs>,
    );

    await user.click(screen.getByRole('tab', { name: 'Trigger2' }));

    expect(handleChange).not.toHaveBeenCalled();
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content1');

    await user.tab();
    expect(screen.getByRole('tab', { name: 'Trigger1' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('tab', { name: 'Trigger3' })).toHaveFocus();
    await user.keyboard('{Enter}');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content3');
  });

  it('TabsTrigger를 클릭하면 해당하는 value의 Content를 보여준다.', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2}>Trigger2</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>,
    );

    fireEvent.click(screen.getByText('Trigger1'));
    expect(screen.queryByText('Content1')).toBeInTheDocument();
    expect(screen.queryByText('Content2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Trigger2'));
    expect(screen.queryByText('Content1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content2')).toBeInTheDocument();
  });

  it('defaultValue에 해당하는 Content를 기본적으로 보여준다.', () => {
    render(
      <Tabs defaultValue={2}>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2}>Trigger2</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>,
    );

    expect(screen.queryByText('Content1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content2')).toBeInTheDocument();
  });
  it('calls onChange with the selected tab value.', () => {
    const handleChange = jest.fn();

    render(
      <Tabs defaultValue={1} onChange={handleChange}>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2}>Trigger2</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>,
    );

    expect(handleChange).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Trigger2'));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('Trigger2'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('supports controlled value changes.', () => {
    const handleChange = jest.fn();
    const renderTabs = (value: number) => (
      <Tabs value={value} onChange={handleChange}>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2}>Trigger2</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>
    );

    const { rerender } = render(renderTabs(1));

    expect(screen.queryByText('Content1')).toBeInTheDocument();
    expect(screen.queryByText('Content2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Trigger2'));

    expect(handleChange).toHaveBeenCalledWith(2);
    expect(screen.queryByText('Content1')).toBeInTheDocument();
    expect(screen.queryByText('Content2')).not.toBeInTheDocument();

    rerender(renderTabs(2));

    expect(screen.queryByText('Content1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content2')).toBeInTheDocument();
  });

  it('does not submit a form when a trigger is clicked.', () => {
    const handleSubmit = jest.fn((event: FormEvent<HTMLFormElement>) =>
      event.preventDefault(),
    );

    render(
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue={1}>
          <TabsList>
            <TabsTrigger value={1}>Trigger1</TabsTrigger>
            <TabsTrigger value={2}>Trigger2</TabsTrigger>
          </TabsList>
          <TabsContent value={1}>Content1</TabsContent>
          <TabsContent value={2}>Content2</TabsContent>
        </Tabs>
      </form>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Trigger2' }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('keeps internal selected attributes from being overridden.', () => {
    render(
      <Tabs defaultValue={1}>
        <TabsList>
          <TabsTrigger data-tabs-selected="false" value={1}>
            Trigger1
          </TabsTrigger>
          <TabsTrigger data-tabs-selected="true" value={2}>
            Trigger2
          </TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole('tab', { name: 'Trigger1' })).toHaveAttribute(
      'data-tabs-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: 'Trigger2' })).not.toHaveAttribute(
      'data-tabs-selected',
    );
  });

  it('provides tab accessibility roles and relationships.', () => {
    render(
      <Tabs defaultValue={1}>
        <TabsList>
          <TabsTrigger value={1}>Trigger1</TabsTrigger>
          <TabsTrigger value={2}>Trigger2</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>Content1</TabsContent>
        <TabsContent value={2}>Content2</TabsContent>
      </Tabs>,
    );

    const tabList = screen.getByRole('tablist');
    const selectedTab = screen.getByRole('tab', { name: 'Trigger1' });
    const panel = screen.getByRole('tabpanel');

    expect(tabList).toBeInTheDocument();
    expect(selectedTab).toHaveAttribute('aria-selected', 'true');
    expect(selectedTab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', selectedTab.id);
  });
});
