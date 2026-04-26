import type { ComponentProps } from 'react';
import { useState } from 'react';

import { Range, Typography } from '@kimdw-rtk/ui';
import { scaleColor, semanticColor, typography } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const colorOptions = [...semanticColor, ...scaleColor];
const sizeOptions = Object.keys(typography.size);
const playgroundSource = `
const [value, setValue] = useState({
  min: 20,
  max: 80,
});

<Range
  min={0}
  max={100}
  defaultMinValue={20}
  defaultMaxValue={80}
  color="primary"
  size="md"
  onChange={(min, max) => {
    setValue({ min, max });
  }}
  style={{ width: '300px' }}
/>
`.trim();

const RangePreview = (args: ComponentProps<typeof Range>) => {
  const [value, setValue] = useState({
    min: args.defaultMinValue,
    max: args.defaultMaxValue,
  });

  return (
    <>
      <Typography>
        {value.min} - {value.max}
      </Typography>
      <Range
        key={`${args.min}-${args.max}-${args.defaultMinValue}-${args.defaultMaxValue}`}
        {...args}
        onChange={(min, max) => {
          setValue({ min, max });
          args.onChange(min, max);
        }}
        style={{ width: '300px' }}
      />
    </>
  );
};

const meta = {
  title: 'Components/Range',
  component: Range,
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
    defaultMinValue: 20,
    defaultMaxValue: 80,
    color: 'primary',
    size: 'md',
    onChange: fn(),
  },
} satisfies Meta<typeof Range>;

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
  render: (args) => <RangePreview {...args} />,
};
