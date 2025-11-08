import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sprinkles, sx, type SprinklesProps } from '#styles';
import type { UIComponent } from '#types';
import { filterSprinkles, omitSprinkles } from '#utils';

import * as s from './Container.css';

type ContainerProps = UIComponent<'div', typeof s.container> & SprinklesProps;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, size, sx: propSx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.container({ size }),
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
Container.displayName = 'Container';
