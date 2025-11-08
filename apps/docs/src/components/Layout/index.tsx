import { ReactNode } from 'react';

import {
  Container,
  NavigationAside,
  NavigationBar,
  NavigationContainer,
  NavigationDrawer,
  NavigationItem,
  NavigationMenu,
} from '@kimdw-rtk/ui';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>
        <NavigationBar size="sm">
          <NavigationContainer
            size="lg"
            sx={{ paddingX: { desktop: '2xl', mobile: 'xl' } }}
          >
            <NavigationDrawer
              menu={
                <NavigationMenu>
                  <NavigationItem>react-kits</NavigationItem>
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
        <Container size="md">{children}</Container>
      </main>
    </>
  );
};
