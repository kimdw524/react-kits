import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeCustomizer } from '../theme';

const meta = {
  component: ThemeCustomizer,
  tags: ['!autodocs', '!dev', '!test'],
} satisfies Meta<typeof ThemeCustomizer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
