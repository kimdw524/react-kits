import type { ComponentProps } from 'react';

import {
  Button,
  NavigationAside,
  NavigationBar,
  NavigationContainer,
  NavigationDrawer,
  NavigationItem,
  NavigationLogo,
  NavigationMenu,
} from '@kimdw-rtk/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Navigation',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies ComponentProps<
        typeof NavigationBar
      >['size'][],
    },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavBar: Story = {
  render: (args) => (
    <NavigationBar {...args}>
      <NavigationContainer sx={{ paddingX: { desktop: '2xl', mobile: 'xl' } }}>
        <NavigationLogo>NavigationLogo</NavigationLogo>
        <NavigationDrawer
          menu={
            <NavigationMenu>
              <NavigationItem isSelected={true}>Overview</NavigationItem>
              <NavigationItem>Components</NavigationItem>
              <NavigationItem>Tokens</NavigationItem>
            </NavigationMenu>
          }
          aside={
            <NavigationAside>
              <Button size="sm">Sign in</Button>
            </NavigationAside>
          }
        />
      </NavigationContainer>
    </NavigationBar>
  ),
};
