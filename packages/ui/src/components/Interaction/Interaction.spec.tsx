import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sprinkles } from '#styles';

import { uiTest } from '../../tests';
import { Interaction } from './';

describe('Interaction component', () => {
  uiTest<HTMLDivElement>(Interaction, 'Interaction');

  it('renders children and bubbles click events', () => {
    const handleClick = jest.fn();

    render(
      <Interaction onClick={handleClick}>
        <input aria-label="Action" type="checkbox" />
      </Interaction>,
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'Action' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies size styles', () => {
    render(<Interaction data-testid="interaction" size="sm" />);

    expect(screen.getByTestId('interaction')).toHaveClass(
      sprinkles({ padding: 'sm' }),
    );
  });

  it('does not call onClick when a nested child contains a disabled input', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Interaction onClick={handleClick}>
        <span>
          <input aria-label="Nested action" type="checkbox" disabled />
        </span>
      </Interaction>,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Nested action' }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
