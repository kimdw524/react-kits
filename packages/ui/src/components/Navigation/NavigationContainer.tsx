import { forwardRef, type ComponentProps } from 'react';

import clsx from 'clsx';

import { Container } from '#components';
import { sx } from '#styles';

import * as s from './NavigationContainer.css';

type NavigationContainerProps = ComponentProps<typeof Container>;

export const NavigationContainer = forwardRef<
  HTMLDivElement,
  NavigationContainerProps
>(({ children, className, sx: propSx, ...props }, ref) => {
  return (
    <Container
      ref={ref}
      className={clsx(className, s.container, sx(propSx))}
      {...props}
    >
      {children}
    </Container>
  );
});
NavigationContainer.displayName = 'NavigationContainer';
