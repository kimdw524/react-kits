import { Select, SelectOption } from '@kimdw-rtk/ui';
import { scaleColor, semanticColor, typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const colorOptions = [
  ...semanticColor,
  ...scaleColor.map((color) => `${color}-500`),
];
const sizeOptions = Object.keys(typography.size);
const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['outlined', 'contained'],
    },
    color: {
      control: 'select',
      options: colorOptions,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
    children: {
      control: false,
    },
  },
  args: {
    defaultValue: 'pro',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    onChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Select {...args} width={320}>
      <SelectOption value="starter">Starter</SelectOption>
      <SelectOption value="pro">Pro</SelectOption>
      <SelectOption value="enterprise">Enterprise</SelectOption>
    </Select>
  ),
};
