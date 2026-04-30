import { forwardRef } from 'react';

import { clsx } from 'clsx';

import { sx, type BoxProperties } from '#styles';
import type { UIComponent } from '#types';
import { filterSprinkles, omitSprinkles } from '#utils';

import * as s from './Container.css';

type ContainerProps = UIComponent<'div', typeof s.container> & BoxProperties;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, size, sx: propSx, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          s.container({ size }),
          sx(filterSprinkles(rest)),
          sx(propSx),
        )}
        {...omitSprinkles(rest)}
      >
        {children}
      </div>
    );
  },
);
Container.displayName = 'Container';
