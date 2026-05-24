import { Box, Flex, Typography } from '@kimdw-rtk/ui';
import { spacing } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const spacingOptions = Object.keys(spacing) as (keyof typeof spacing)[];

const meta = {
  title: 'Components/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: spacingOptions,
    },
    flexDirection: {
      control: 'inline-radio',
      options: ['row', 'column'],
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'space-between'],
    },
    alignItems: {
      control: 'select',
      options: ['stretch', 'center', 'flex-start', 'flex-end'],
    },
    children: {
      control: false,
    },
  },
  args: {
    gap: 'lg',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Flex {...args} style={{ minWidth: 360 }}>
      {['Plan', 'Build', 'Ship'].map((label) => (
        <Box
          key={label}
          isRounded={true}
          style={{
            minWidth: 96,
            padding: 20,
            border: '1px solid rgba(127, 127, 127, 0.18)',
          }}
        >
          <Typography as="span">{label}</Typography>
        </Box>
      ))}
    </Flex>
  ),
};
