import type { ComponentProps } from 'react';
import { useState } from 'react';

import { Slider, Typography } from '@kimdw-rtk/ui';
import { scaleColor, semanticColor, typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const colorOptions = [...semanticColor, ...scaleColor];
const sizeOptions = Object.keys(typography.size);
const playgroundSource = `
const [value, setValue] = useState(50);

<Slider
  min={0}
  max={100}
  defaultValue={50}
  color="primary"
  size="md"
  onChange={(value) => {
    setValue(value);
  }}
  style={{ width: '300px' }}
/>
`.trim();

const SliderPreview = (args: ComponentProps<typeof Slider>) => {
  const [value, setValue] = useState(args.defaultValue);

  return (
    <>
      <Typography>{value}</Typography>
      <Slider
        key={`${args.min}-${args.max}-${args.defaultValue}`}
        {...args}
        onChange={(nextValue) => {
          setValue(nextValue);
          args.onChange(nextValue);
        }}
        style={{ width: '300px' }}
      />
    </>
  );
};

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: colorOptions,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
  },
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    color: 'primary',
    size: 'md',
    onChange: fn(),
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: playgroundSource,
      },
    },
  },
  render: (args) => <SliderPreview {...args} />,
};
