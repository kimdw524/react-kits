import { Toast } from '@kimdw-rtk/ui';
import { semanticColor } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const colorOptions = [...semanticColor];

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: colorOptions,
    },
  },
  args: {
    children: 'Changes saved successfully.',
    color: 'success',
    duration: 0,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Toast {...args} />,
};
