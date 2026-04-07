import { forwardRef } from 'react';

import clsx from 'clsx';

import * as s from './TabsIndicator.css';

export const TabsIndicator = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<'div'>
>(({ className, ...rest }, ref) => {
  return <div ref={ref} className={clsx(s.indicator, className)} {...rest} />;
});
TabsIndicator.displayName = 'TabsIndicator';
