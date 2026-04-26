import { Card, CardContent, Flex, ScrollArea, Typography } from '@kimdw-rtk/ui';
import { spacing } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const spacingOptions = Object.keys(spacing) as (keyof typeof spacing)[];

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    innerPadding: {
      control: 'select',
      options: spacingOptions,
    },
    children: {
      control: false,
    },
  },
  args: {
    innerPadding: 'lg',
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ width: 640 }}>
      <Flex gap="lg">
        {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].map((name) => (
          <Card key={name} width={220}>
            <CardContent>
              <Typography as="h3" fontWeight="semiBold">
                {name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Flex>
    </ScrollArea>
  ),
};
