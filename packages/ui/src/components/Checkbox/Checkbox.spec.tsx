import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sprinkles } from '#styles';

import { Checkbox } from '.';
import { uiTest } from '../../tests';

describe('Checkbox component', () => {
  uiTest(Checkbox, 'Checkbox');

  it('updates checked state when clicked', () => {
    render(<Checkbox>Agree</Checkbox>);

    const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <Checkbox disabled onChange={handleChange}>
        Agree
      </Checkbox>,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Agree' }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not wrap with Interaction by default', () => {
    render(<Checkbox>Agree</Checkbox>);

    const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

    expect(checkbox.parentElement?.parentElement?.tagName).toBe('LABEL');
  });

  it('wraps with Interaction when interaction is not none', () => {
    render(<Checkbox interaction="sm">Agree</Checkbox>);

    const checkbox = screen.getByRole('checkbox', { name: 'Agree' });

    expect(checkbox.closest('div')).toHaveClass(sprinkles({ padding: 'sm' }));
  });
});
