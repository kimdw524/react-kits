import { LabelInteraction } from '@kimdw-rtk/ui';
import { spacing } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const sizeOptions = Object.keys(spacing) as (keyof typeof spacing)[];

const meta = {
  title: 'Components/LabelInteraction',
  component: LabelInteraction,
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
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof LabelInteraction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: (
      <label style={{ gap: 8 }}>
        <input type="checkbox" />
        Child
      </label>
    ),
  },
  render: (args) => <LabelInteraction {...args} />,
};

export const DisabledChild: Story = {
  args: {
    children: (
      <label style={{ gap: 8 }}>
        <input disabled type="checkbox" />
        Disabled child
      </label>
    ),
  },
  render: (args) => <LabelInteraction {...args} />,
};
