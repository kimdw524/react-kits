import { forwardRef, type ComponentProps } from 'react';

import clsx from 'clsx';

import type { Tabs } from '#components';

import * as s from './TabsIndicator.css';

export const TabsIndicator = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<'div'> & {
    variant: NonNullable<ComponentProps<typeof Tabs>['variant']>;
  }
>(({ className, variant, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(s.indicator({ variant }), className)}
      {...rest}
    />
  );
});
TabsIndicator.displayName = 'TabsIndicator';
