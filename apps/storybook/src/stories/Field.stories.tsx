import type { ComponentProps } from 'react';

import {
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  TextField,
} from '@kimdw-rtk/ui';
import { spacing } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

type FieldSetProps = ComponentProps<typeof FieldSet>;
type FieldGroupProps = ComponentProps<typeof FieldGroup>;
type FieldStoryArgs = FieldSetProps & {
  'FieldGroup.gap'?: FieldGroupProps['gap'];
};

const gapOptions = Object.keys(spacing) as FieldSetProps['gap'][];

const splitFieldArgs = ({
  'FieldGroup.gap': fieldGroupGap,
  ...fieldSetProps
}: FieldStoryArgs) => ({
  fieldGroupGap,
  fieldSetProps,
});

const meta = {
  title: 'Components/Field',
  component: FieldSet,
  parameters: {
    layout: 'centered',
    controls: {
      include: ['disabled', 'gap', 'FieldGroup.gap'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    gap: {
      control: 'select',
      options: gapOptions,
    },
    'FieldGroup.gap': {
      control: 'select',
      options: gapOptions,
    },
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  args: {
    disabled: false,
    gap: 'lg',
    'FieldGroup.gap': 'md',
  },
} satisfies Meta<FieldStoryArgs>;

export default meta;
type Story = StoryObj<FieldStoryArgs>;

export const Playground: Story = {
  render: (args) => {
    const { fieldGroupGap, fieldSetProps } = splitFieldArgs(args);

    return (
      <FieldSet {...fieldSetProps} style={{ width: 360 }}>
        <FieldLegend>FieldSet/FieldLegend</FieldLegend>
        <FieldDescription>FieldSet/FieldDescription</FieldDescription>
        <FieldGroup gap={fieldGroupGap}>
          <Field>
            <FieldLabel htmlFor="field-text-field">Field/FieldLabel</FieldLabel>
            <TextField id="field-text-field" placeholder="Field/TextField" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-text-field-description">
              Field/FieldLabel
            </FieldLabel>
            <TextField
              id="field-text-field-description"
              placeholder="Field/TextField"
            />
            <FieldDescription>Field/FieldDescription</FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    );
  },
};

export const Composition: Story = {
  render: (args) => {
    const { fieldGroupGap, fieldSetProps } = splitFieldArgs(args);

    return (
      <FieldSet {...fieldSetProps} style={{ width: 420 }}>
        <FieldLegend>FieldSet</FieldLegend>
        <FieldGroup gap={fieldGroupGap}>
          <Field>
            <FieldLabel htmlFor="composition-text-field">
              Field/FieldLabel
            </FieldLabel>
            <TextField
              id="composition-text-field"
              defaultValue="Field/TextField"
            />
            <FieldDescription>Field/FieldDescription</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Field/FieldLabel</FieldLabel>
            <Checkbox defaultChecked>Field/Checkbox</Checkbox>
            <Checkbox>Field/Checkbox</Checkbox>
          </Field>
          <Button>Field/Button</Button>
        </FieldGroup>
      </FieldSet>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const { fieldSetProps } = splitFieldArgs(args);

    return (
      <FieldSet {...fieldSetProps} style={{ width: 360 }}>
        <FieldLegend>FieldSet</FieldLegend>
        <Field>
          <FieldLabel htmlFor="disabled-text-field">
            Field/FieldLabel
          </FieldLabel>
          <TextField id="disabled-text-field" defaultValue="Field/TextField" />
          <FieldDescription>Field/FieldDescription</FieldDescription>
        </Field>
        <Checkbox defaultChecked>Field/Checkbox</Checkbox>
      </FieldSet>
    );
  },
};
