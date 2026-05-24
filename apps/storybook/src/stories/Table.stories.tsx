import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kimdw-rtk/ui';
import { spacing } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const sizeOptions = Object.keys(spacing);

const meta = {
  title: 'Components/Table',
  component: Table,
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
    isStriped: true,
    size: 'md',
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead width="35%">Component</TableHead>
          <TableHead>Status</TableHead>
          <TableHead textAlign="right">Coverage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Button</TableCell>
          <TableCell>Ready</TableCell>
          <TableCell textAlign="right">100%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tabs</TableCell>
          <TableCell>Ready</TableCell>
          <TableCell textAlign="right">94%</TableCell>
        </TableRow>
        <TableRow isInteractive={true}>
          <TableCell>Navigation</TableCell>
          <TableCell>In review</TableCell>
          <TableCell textAlign="right">88%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
