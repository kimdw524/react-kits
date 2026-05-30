import type { ComponentProps } from 'react';

import { Checkbox } from '@kimdw-rtk/ui';
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
type CheckboxInteraction = NonNullable<
  ComponentProps<typeof Checkbox>['interaction']
>;
const interactionSizeOptions = Object.keys(spacing) as Exclude<
  CheckboxInteraction,
  'none'
>[];
const interactionOptions: CheckboxInteraction[] = [
  'none',
  ...interactionSizeOptions,
];

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: colorOptions,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
    interaction: {
      control: 'select',
      options: interactionOptions,
    },
    disabled: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
    checked: {
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
    children: 'Checkbox',
    color: 'primary',
    interaction: undefined,
    size: 'md',
    disabled: false,
    defaultChecked: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {sizeOptions.map((size) => (
        <Checkbox key={size} {...args} size={size}>
          {size}
        </Checkbox>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox {...args}>Unchecked</Checkbox>
      <Checkbox {...args} defaultChecked>
        Checked
      </Checkbox>
      <Checkbox {...args} disabled>
        Disabled
      </Checkbox>
      <Checkbox {...args} defaultChecked disabled>
        Checked disabled
      </Checkbox>
    </div>
  ),
};

export const SemanticPalette: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {(['primary', 'secondary', 'accent', 'danger', 'success'] as const).map(
        (color) => (
          <Checkbox key={color} {...args} color={color} defaultChecked>
            {color}
          </Checkbox>
        ),
      )}
    </div>
  ),
};
