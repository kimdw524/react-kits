import { Box, Container, Typography } from '@kimdw-rtk/ui';
import { width } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const widthOptions = Object.keys(width) as (keyof typeof width)[];
const widthLabels = Object.fromEntries(
  widthOptions.map((size) => [size, `${size} (${width[size]})`]),
) as Record<(typeof widthOptions)[number], string>;

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        labels: widthLabels,
      },
      options: widthOptions,
    },
    children: {
      control: false,
    },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Container {...args}>
      <Box backgroundColor="primary" padding="lg">
        <Typography as="h3" fontSize="lg" color="primary-foreground">
          Container
        </Typography>
      </Box>
    </Container>
  ),
};
