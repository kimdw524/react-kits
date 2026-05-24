import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  Typography,
} from '@kimdw-rtk/ui';
import { typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

const sizeOptions = Object.keys(typography.size);
const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
  },
  args: {
    isExpanded: false,
    isPadding: true,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderAccordion: Story['render'] = (args) => (
  <Accordion {...args}>
    <AccordionTrigger>AccordionTrigger</AccordionTrigger>
    <AccordionContent>
      <Typography>AccordionContent</Typography>
    </AccordionContent>
  </Accordion>
);

export const Playground: Story = {
  render: renderAccordion,
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
  render: renderAccordion,
};
