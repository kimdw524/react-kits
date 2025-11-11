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
        className={clsx(s.container({ isSelected }), className, sx(propSx))}
        style={{ ...style }}
        {...props}
      />
    );
  },
);
NavigationItem.displayName = 'NavigationItem';
