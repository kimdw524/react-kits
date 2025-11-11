import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sprinkles, sx, type SprinklesProps } from '#styles';
import type { UIComponent } from '#types';
import { filterSprinkles, omitSprinkles } from '#utils';

import * as s from './Flex.css';

type FlexProps = UIComponent<'div'> & SprinklesProps;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, sx: propSx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.flex,
          sx(propSx),
          sprinkles(filterSprinkles(props)),
        )}
        {...omitSprinkles(props)}
      >
        {children}
      </div>
    );
  },
);
Flex.displayName = 'Flex';
