import type { ComponentProps } from 'react';

import { Box, Typography } from '@kimdw-rtk/ui';
import { spacing, width } from '@kimdw-rtk/ui/token';
import type { Meta, StoryObj } from '@storybook/react-vite';

type BoxProps = ComponentProps<typeof Box>;

const spacingOptions = Object.keys(spacing) as BoxProps['gap'][];
const widthOptions = Object.keys(width) as BoxProps['width'][];

const displayOptions = [
  'flex',
  'block',
  'none',
  'inline',
  'inline-block',
  'inline-flex',
] satisfies BoxProps['display'][];

const flexDirectionOptions = [
  'row',
  'column',
  'row-reverse',
  'column-reverse',
] satisfies BoxProps['flexDirection'][];

const flexWrapOptions = [
  'nowrap',
  'wrap',
  'wrap-reverse',
  'revert',
  'revert-layer',
] satisfies BoxProps['flexWrap'][];

const justifyContentOptions = [
  'stretch',
  'flex-start',
  'center',
  'flex-end',
  'space-around',
  'space-between',
] satisfies BoxProps['justifyContent'][];

const alignItemsOptions = [
  'stretch',
  'flex-start',
  'center',
  'flex-end',
] satisfies BoxProps['alignItems'][];

const boxShadowOptions = [
  'border-sm',
  'border-md',
  'border-lg',
  'accent-sm',
  'accent-md',
  'accent-lg',
] satisfies BoxProps['boxShadow'][];

const borderRadiusOptions = [
  'none',
  'sm',
  'md',
  'lg',
] satisfies BoxProps['borderRadius'][];

const flexScaleOptions = ['0', '1'] satisfies BoxProps['flexGrow'][];

const meta = {
  title: 'Components/Box',
  component: Box,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Box',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    isRounded: {
      control: 'boolean',
    },
    display: {
      control: 'select',
      options: displayOptions,
      table: { category: 'BoxProperties' },
    },
    flexDirection: {
      control: 'select',
      options: flexDirectionOptions,
      table: { category: 'BoxProperties' },
    },
    flexWrap: {
      control: 'select',
      options: flexWrapOptions,
      table: { category: 'BoxProperties' },
    },
    flexShrink: {
      control: 'inline-radio',
      options: flexScaleOptions,
      table: { category: 'BoxProperties' },
    },
    flexGrow: {
      control: 'inline-radio',
      options: flexScaleOptions,
      table: { category: 'BoxProperties' },
    },
    flexBasis: {
      control: 'select',
      options: widthOptions,
      table: { category: 'BoxProperties' },
    },
    justifyContent: {
      control: 'select',
      options: justifyContentOptions,
      table: { category: 'BoxProperties' },
    },
    alignItems: {
      control: 'select',
      options: alignItemsOptions,
      table: { category: 'BoxProperties' },
    },
    gap: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    padding: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    paddingX: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    paddingY: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    paddingTop: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    paddingBottom: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    paddingLeft: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    paddingRight: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    margin: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    marginX: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    marginY: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    marginTop: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    marginBottom: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    marginLeft: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    marginRight: {
      control: 'select',
      options: spacingOptions,
      table: { category: 'BoxProperties' },
    },
    boxShadow: {
      control: 'select',
      options: boxShadowOptions,
      table: { category: 'BoxProperties' },
    },
    borderRadius: {
      control: 'select',
      options: borderRadiusOptions,
      table: { category: 'BoxProperties' },
    },
    width: {
      control: 'select',
      options: widthOptions,
      table: { category: 'BoxProperties' },
    },
    height: {
      control: 'select',
      options: widthOptions,
      table: { category: 'BoxProperties' },
    },
  },
  args: {
    children: 'Box',
    isRounded: true,
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Box
      {...args}
      style={{
        minWidth: 320,
        padding: 24,
        border: '1px solid rgba(127, 127, 127, 0.18)',
      }}
    >
      <Typography as="span">{args.children}</Typography>
    </Box>
  ),
};
