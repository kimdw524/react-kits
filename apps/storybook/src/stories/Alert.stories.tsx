import { Alert } from '@kimdw-rtk/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Alert message.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Alert {...args} />,
};
