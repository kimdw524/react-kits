import { Skeleton } from '@kimdw-rtk/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    width: 320,
    height: 18,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLines: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton {...args} />
      <Skeleton {...args} width={280} />
      <Skeleton {...args} width={220} />
    </div>
  ),
};

export const CardPreview: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton {...args} width={360} height={180} />
      <Skeleton {...args} width={240} />
      <Skeleton {...args} width={300} />
    </div>
  ),
};
