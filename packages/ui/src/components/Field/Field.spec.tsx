import { createRef } from 'react';

import { render, screen } from '@testing-library/react';

import { sprinkles } from '#styles';

import { uiTest } from '../../tests';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './';

describe('Field components', () => {
  uiTest(FieldSet, 'FieldSet');
  uiTest(FieldDescription, 'FieldDescription');
  uiTest(FieldGroup, 'FieldGroup');
  uiTest(Field, 'Field');

  it('renders an accessible field group with label and description', () => {
    render(
      <FieldSet>
        <FieldLegend>Account</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <FieldDescription id="name-description">
              Enter your display name.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>,
    );

    expect(screen.getByRole('group', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByText('Name').closest('label')).toHaveAttribute(
      'for',
      'name',
    );
    expect(screen.getByText('Enter your display name.')).toHaveAttribute(
      'id',
      'name-description',
    );
  });

  it('applies FieldLabel props and text styles to the label element', () => {
    const ref = createRef<HTMLLabelElement>();

    render(
      <FieldLabel
        ref={ref}
        className="test"
        color="muted-foreground"
        data-testid="field-label"
        fontSize="md"
        fontWeight="semiBold"
        htmlFor="name"
        lineHeight="lg"
        style={{ textDecoration: 'underline' }}
      >
        Name
      </FieldLabel>,
    );

    const label = screen.getByTestId('field-label');

    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'name');
    expect(label).toHaveClass('test');
    expect(label).toHaveClass(
      sprinkles({
        display: 'inline-flex',
        color: 'muted-foreground',
        fontSize: 'md',
        fontWeight: 'semiBold',
        lineHeight: 'lg',
      }),
    );
    expect(label).toHaveStyle({ textDecoration: 'underline' });
    expect(ref.current).toBe(label);
  });

  it('applies FieldLegend props and text styles to the legend element', () => {
    const ref = createRef<HTMLLegendElement>();

    render(
      <FieldSet>
        <FieldLegend
          ref={ref}
          className="test"
          color="muted-foreground"
          data-testid="field-legend"
          fontSize="lg"
          fontWeight="bold"
          lineHeight="xl"
          style={{ textDecoration: 'underline' }}
        >
          Account
        </FieldLegend>
      </FieldSet>,
    );

    const legend = screen.getByTestId('field-legend');

    expect(legend.tagName).toBe('LEGEND');
    expect(legend).toHaveClass('test');
    expect(legend).toHaveClass(
      sprinkles({
        padding: 'none',
        color: 'muted-foreground',
        fontSize: 'lg',
        fontWeight: 'bold',
        lineHeight: 'xl',
      }),
    );
    expect(legend).toHaveStyle({ textDecoration: 'underline' });
    expect(ref.current).toBe(legend);
  });
});
