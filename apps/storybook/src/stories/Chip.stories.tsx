import { Chip } from '@kimdw-rtk/ui';
import { scaleColor, semanticColor, typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const colorOptions = [...semanticColor, ...scaleColor];
const sizeOptions = Object.keys(typography.size);

const meta = {
  title: 'Components/Chip',
  component: Chip,
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
  },
  args: {
    children: 'Chip',
    color: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
          <Chip key={color} {...args} color={color}>
            {color}
          </Chip>
        ),
      )}
    </div>
  ),
};
