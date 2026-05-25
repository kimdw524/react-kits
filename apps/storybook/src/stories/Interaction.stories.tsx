import { Checkbox, Interaction } from '@kimdw-rtk/ui';
import { spacing } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const sizeOptions = Object.keys(spacing) as (keyof typeof spacing)[];

const meta = {
  title: 'Components/Interaction',
  component: Interaction,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
    },
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
    onClick: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  args: {
    size: 'md',
    onClick: fn(),
  },
} satisfies Meta<typeof Interaction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Interaction {...args}>
      <Checkbox>Child</Checkbox>
    </Interaction>
  ),
};

export const DisabledChild: Story = {
  render: (args) => (
    <Interaction {...args}>
      <Checkbox disabled>Disabled child</Checkbox>
    </Interaction>
  ),
};
