import { Button, Separator } from '@kimdw-rtk/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
    separator: {
      control: false,
    },
  },
  args: {
    children: undefined,
    separator: <span>/</span>,
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Separator {...args}>
        <Button variant="ghost">Docs</Button>
        <Button variant="ghost">Guides</Button>
        <Button variant="ghost">Tokens</Button>
      </Separator>
    </div>
  ),
};
