import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationItem.css';

type NavigationItemProps = UIComponent<'div', typeof s.container>;

export const NavigationItem = forwardRef<HTMLDivElement, NavigationItemProps>(
  ({ style, className, sx: propSx, isSelected = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{ ...style }}
        className={clsx(s.container({ isSelected }), className, sx(propSx))}
        {...props}
      />
    );
  },
);
NavigationItem.displayName = 'NavigationItem';
