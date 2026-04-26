import { Button } from '@kimdw-rtk/ui';
import { scaleColor, semanticColor, typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchIcon, SettingsIcon } from 'lucide-react';
import { fn } from 'storybook/test';

const sizeOptions = Object.keys(
  typography.size,
) as (keyof typeof typography.size)[];

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: 'inline-radio',
      options: ['contained', 'outlined', 'ghost'],
    },
    color: {
      control: 'select',
      options: [...scaleColor, ...semanticColor],
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
    icon: {
      control: 'select',
      options: ['none', 'search', 'settings'],
      mapping: {
        none: undefined,
        search: <SearchIcon />,
        settings: <SettingsIcon />,
      },
    },
    disabled: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
    onClick: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'md',
    icon: undefined,
    disabled: false,
    pulse: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args} variant="contained">
        Contained
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {sizeOptions.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <SearchIcon />,
    children: 'Search',
  },
};

export const IconOnly: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {sizeOptions.map((size) => (
        <Button
          key={size}
          {...args}
          size={size}
          aria-label={`Settings ${size}`}
        />
      ))}
    </div>
  ),
  args: {
    icon: <SettingsIcon />,
    children: undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Pulse: Story = {
  args: {
    pulse: true,
  },
};
