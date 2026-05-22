import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroup, RadioGroupItem } from '.';
import { uiTest } from '../../tests';

describe('RadioGroup component', () => {
  uiTest<HTMLFieldSetElement>(RadioGroup, 'RadioGroup');

  it('renders the default selected item', () => {
    render(
      <RadioGroup defaultValue="pro" label="Plan">
        <RadioGroupItem value="starter">Starter</RadioGroupItem>
        <RadioGroupItem value="pro">Pro</RadioGroupItem>
      </RadioGroup>,
    );

    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });

  it('calls onChange when an item is selected', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <RadioGroup defaultValue="starter" label="Plan" onChange={handleChange}>
        <RadioGroupItem value="starter">Starter</RadioGroupItem>
        <RadioGroupItem value="pro">Pro</RadioGroupItem>
      </RadioGroup>,
    );

    await user.click(screen.getByRole('radio', { name: 'Pro' }));

    expect(handleChange).toHaveBeenCalledWith('pro');
  });

  it('supports controlled value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    const ControlledRadioGroup = () => {
      const [value, setValue] = useState('starter');

      return (
        <RadioGroup
          label="Plan"
          value={value}
          onChange={(nextValue) => {
            handleChange(nextValue);
            setValue(nextValue);
          }}
        >
          <RadioGroupItem value="starter">Starter</RadioGroupItem>
          <RadioGroupItem value="pro">Pro</RadioGroupItem>
        </RadioGroup>
      );
    };

    render(<ControlledRadioGroup />);

    const starter = screen.getByRole('radio', { name: 'Starter' });
    const pro = screen.getByRole('radio', { name: 'Pro' });

    expect(starter).toBeChecked();
    expect(pro).not.toBeChecked();

    await user.click(pro);

    expect(handleChange).toHaveBeenCalledWith('pro');
    expect(starter).not.toBeChecked();
    expect(pro).toBeChecked();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <RadioGroup label="Plan" disabled onChange={handleChange}>
        <RadioGroupItem value="starter">Starter</RadioGroupItem>
        <RadioGroupItem value="pro">Pro</RadioGroupItem>
      </RadioGroup>,
    );

    await user.click(screen.getByRole('radio', { name: 'Pro' }));

    expect(handleChange).not.toHaveBeenCalled();
  });
});
