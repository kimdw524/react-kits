import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from '@kimdw-rtk/ui';
import { typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const sizeOptions = Object.keys(typography.size);

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: sizeOptions,
    },
    children: {
      control: false,
    },
  },
  args: {
    defaultValue: 'overview',
    size: 'md',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args} style={{ width: '600px' }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Typography>
          Project status, release notes, and health metrics.
        </Typography>
      </TabsContent>
      <TabsContent value="activity">
        <Typography>Recent commits, reviews, and deployment events.</Typography>
      </TabsContent>
      <TabsContent value="settings">
        <Typography>
          Permissions, environment variables, and access rules.
        </Typography>
      </TabsContent>
    </Tabs>
  ),
};
