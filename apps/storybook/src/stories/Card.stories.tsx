import type { ComponentProps } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardInteraction,
  CardThumbnail,
} from '@kimdw-rtk/ui';
import { scaleColor, semanticColor, spacing } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const placeholderThumbnail =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiB2aWV3Qm94PSIwIDAgNjQwIDM2MCI+PHJlY3Qgd2lkdGg9IjY0MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiMzYjgyZjYiLz48L3N2Zz4=';
const sizeOptions = Object.keys(spacing);

const meta = {
  title: 'Components/Card',
  component: Card,
  render: (args) => (
    <Card {...args}>
      <CardInteraction onClick={fn()}>
        <CardThumbnail alt="Project preview" src={placeholderThumbnail} />
        <CardHeader>CardHeader</CardHeader>
        <CardContent>CardContent</CardContent>
      </CardInteraction>
    </Card>
  ),
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
    height: {
      control: false,
      table: {
        disable: true,
      },
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined'] satisfies ComponentProps<
        typeof Card
      >['variant'][],
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
    color: {
      control: 'select',
      options: [
        ...semanticColor,
        ...scaleColor,
        'transparent',
      ] satisfies ComponentProps<typeof Card>['color'][],
    },
  },
  args: {
    width: 340,
    variant: 'outlined',
    size: 'md',
    color: 'card',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

export const Contained: Story = {
  args: {
    variant: 'contained',
  },
};
