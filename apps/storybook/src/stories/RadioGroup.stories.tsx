import type { ComponentProps } from 'react';

import { RadioGroup, RadioGroupItem } from '@kimdw-rtk/ui';
import {
  scaleColor,
  semanticColor,
  spacing,
  typography,
} from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const colorOptions = [...semanticColor, ...scaleColor];
const sizeOptions = Object.keys(
  typography.size,
) as (keyof typeof typography.size)[];
const gapOptions = Object.keys(spacing) as (keyof typeof spacing)[];
type RadioGroupInteraction = NonNullable<
  ComponentProps<typeof RadioGroup>['interaction']
>;
const interactionSizeOptions = Object.keys(spacing) as Exclude<
  RadioGroupInteraction,
  'none'
>[];
const interactionOptions: RadioGroupInteraction[] = [
  'none',
  ...interactionSizeOptions,
];

const planItems = (
  <>
    <RadioGroupItem value="item1">Item1</RadioGroupItem>
    <RadioGroupItem value="item2">Item2</RadioGroupItem>
    <RadioGroupItem value="item3">Item3</RadioGroupItem>
  </>
);

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: colorOptions,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: 'select',
      options: gapOptions,
    },
    interaction: {
      control: 'select',
      options: interactionOptions,
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
    value: {
      control: false,
      table: {
        disable: true,
      },
    },
    onChange: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  args: {
    color: 'primary',
    defaultValue: 'item2',
    disabled: false,
    gap: undefined,
    interaction: undefined,
    label: 'RadioGroup',
    children: planItems,
    orientation: 'vertical',
    size: 'md',
    onChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      {sizeOptions.map((size) => (
        <RadioGroup
          key={size}
          {...args}
          defaultValue="item2"
          label={size}
          size={size}
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <RadioGroup {...args} defaultValue="item1" label="Default" />
      <RadioGroup {...args} defaultValue="item3" label="Disabled option">
        <RadioGroupItem value="item1">Item1</RadioGroupItem>
        <RadioGroupItem disabled value="item2">
          Item2
        </RadioGroupItem>
        <RadioGroupItem value="item3">Item3</RadioGroupItem>
      </RadioGroup>
      <RadioGroup {...args} defaultValue="item2" disabled label="Disabled" />
    </div>
  ),
};

export const SemanticPalette: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      {(['primary', 'secondary', 'accent', 'danger', 'success'] as const).map(
        (color) => (
          <RadioGroup
            key={color}
            {...args}
            color={color}
            defaultValue="item2"
            label={color}
          />
        ),
      )}
    </div>
  ),
};

export const Composition: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="item4" label="RadioGroup">
      <RadioGroupItem value="item1">Item1</RadioGroupItem>
      <RadioGroupItem value="item2">Item2</RadioGroupItem>
      <RadioGroupItem value="item3">Item3</RadioGroupItem>
      <RadioGroupItem disabled value="item4">
        Item4
      </RadioGroupItem>
    </RadioGroup>
  ),
};
