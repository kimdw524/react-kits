import { ComponentProps, ReactNode } from 'react';

import {
  Container,
  NavigationAside,
  NavigationBar,
  NavigationContainer,
  NavigationDrawer,
  NavigationItem,
  NavigationMenu,
  UIProvider,
} from '@kimdw-rtk/ui';
import { Link } from 'gatsby';

import '#styles/globalStyle.css';

interface LayoutProps {
  children: ReactNode;
  size?: ComponentProps<typeof Container>['size'];
}

export const Layout = ({ children, size = 'md' }: LayoutProps) => {
  return (
    <UIProvider container={document.getElementById('container')!}>
      <header>
        <NavigationBar size="sm">
          <NavigationContainer
            size="lg"
            sx={{ paddingX: { desktop: '2xl', mobile: 'xl' } }}
          >
            <NavigationDrawer
              menu={
                <NavigationMenu>
                  <NavigationItem>
                    <Link to="/">react-kits</Link>
                  </NavigationItem>
                </NavigationMenu>
              }
              aside={
                <NavigationAside>
                  <NavigationItem>
                    <a
                      href="https://github.com/kimdw524/react-kits"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  </NavigationItem>
                </NavigationAside>
              }
            />
          </NavigationContainer>
        </NavigationBar>
      </header>
      <main>
        <Container size={size}>{children}</Container>
      </main>
    </UIProvider>
  );
};
