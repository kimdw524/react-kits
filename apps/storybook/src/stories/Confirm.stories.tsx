import { Confirm } from '@kimdw-rtk/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/Confirm',
  component: Confirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ref: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: 'Discard unsaved changes and leave this page?',
    onConfirm: fn(),
    onCancle: fn(),
  },
} satisfies Meta<typeof Confirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 'min(720px, 100%)' }}>
      <Confirm {...args} />
    </div>
  ),
};
