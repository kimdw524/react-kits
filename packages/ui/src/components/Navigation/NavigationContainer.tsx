import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '@/styles';
import type { UIComponent } from '@/types';

import * as s from './NavigationContainer.css';

type NavigationContainerProps = UIComponent<'div'>;

export const NavigationContainer = forwardRef<
  HTMLDivElement,
  NavigationContainerProps
>(({ children, className, sx: propSx, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(className, s.container, sx(propSx))}
      {...props}
    >
      {children}
    </div>
  );
});
NavigationContainer.displayName = 'NavigationContainer';
