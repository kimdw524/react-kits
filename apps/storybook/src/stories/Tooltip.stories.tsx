import { Button, Tooltip } from '@kimdw-rtk/ui';
import { typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(typography.size),
    },
    children: {
      control: false,
    },
  },
  args: {
    children: undefined,
    content: 'Inspect the component contract',
    size: 'sm',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  ),
};
