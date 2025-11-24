import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Table.css';

interface TableProps extends UIComponent<'table', typeof s.table> {
  isStriped?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ isStriped, className, size = 'md', sx: propSx, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={clsx(
          s.table({ size }),
          isStriped && s.striped,
          sx(propSx),
          className,
        )}
        {...props}
      />
    );
  },
);
Table.displayName = 'Table';

export { s as tableCss };
