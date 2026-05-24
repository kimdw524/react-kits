import { Typography } from '@kimdw-rtk/ui';
import {
  lightColor,
  scaleColor,
  semanticColor,
  typography,
} from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const scaleColorOptions = scaleColor.flatMap((color) =>
  Object.keys(lightColor[color]).map((scale) => `${color}-${scale}`),
);
const colorOptions = [...semanticColor, ...scaleColorOptions];
const typographySizeOptions = Object.keys(
  typography.size,
) as (keyof typeof typography.size)[];
const typographyWeightOptions = Object.keys(
  typography.weight,
) as (keyof typeof typography.weight)[];

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4'],
    },
    color: {
      control: 'select',
      options: ['foreground', 'background', ...colorOptions],
    },
    gradientFrom: {
      control: 'select',
      options: colorOptions,
    },
    gradientTo: {
      control: 'select',
      options: colorOptions,
    },
    fontSize: {
      control: 'select',
      options: typographySizeOptions,
    },
    fontWeight: {
      control: 'select',
      options: typographyWeightOptions,
    },
  },
  args: {
    children: 'Purposeful typography makes design systems feel coherent.',
    as: 'p',
    color: 'foreground',
    fontSize: 'lg',
    fontWeight: 'normal',
    isEllipsis: false,
    isGradient: false,
    gradientFrom: 'blue-700',
    gradientTo: 'blue-300',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Typography {...args} />,
};

export const GradientHeadline: Story = {
  args: {
    as: 'h2',
    children: 'Build faster with composable UI primitives.',
    fontSize: '4xl',
    fontWeight: 'extraBold',
    isGradient: true,
    gradientFrom: 'blue-700',
    gradientTo: 'blue-300',
  },
};
