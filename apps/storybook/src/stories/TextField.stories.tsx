import { TextField } from '@kimdw-rtk/ui';
import { scaleColor, semanticColor, typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const colorOptions = [...semanticColor, ...scaleColor];
const sizeOptions = Object.keys(typography.size);

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number'],
    },
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
    type: 'text',
    color: 'primary',
    size: 'md',
    placeholder: 'Search components',
    defaultValue: '',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <TextField {...args} style={{ width: 320 }} />,
};
