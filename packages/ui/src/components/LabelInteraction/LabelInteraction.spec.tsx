import { createRef } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sprinkles } from '#styles';

import { LabelInteraction } from './';

describe('LabelInteraction component', () => {
  it('applies interaction styles to the child element', () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <LabelInteraction size="sm">
        <button
          ref={ref}
          className="test"
          data-testid="interaction"
          style={{ color: 'red' }}
          type="button"
        >
          Action
        </button>
      </LabelInteraction>,
    );

    const interaction = screen.getByTestId('interaction');

    expect(interaction).toHaveClass('test');
    expect(interaction).toHaveClass(sprinkles({ padding: 'sm' }));
    expect(interaction).toHaveStyle({ color: 'red' });
    expect(ref.current).toBe(interaction);
  });

  it('renders children and preserves child events', () => {
    const handleChildClick = jest.fn();

    render(
      <LabelInteraction>
        <label onClick={handleChildClick}>
          <input aria-label="Action" type="checkbox" />
        </label>
      </LabelInteraction>,
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'Action' }));

    expect(handleChildClick).toHaveBeenCalledTimes(1);
  });

  it('does not call child click when a nested child contains a disabled input', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <LabelInteraction>
        <label onClick={handleClick}>
          <input aria-label="Nested action" type="checkbox" disabled />
        </label>
      </LabelInteraction>,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Nested action' }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
