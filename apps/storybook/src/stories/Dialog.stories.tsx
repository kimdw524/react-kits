import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Flex,
} from '@kimdw-rtk/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogHeader onCloseClick={fn()}>Invite collaborators</DialogHeader>
      <DialogContent>
        Add teammates to this project and choose whether they can edit or review
        changes.
      </DialogContent>
      <DialogFooter>
        <Flex gap="md">
          <Button color="secondary" variant="ghost">
            Later
          </Button>
          <Button>Send invite</Button>
        </Flex>
      </DialogFooter>
    </Dialog>
  ),
};
