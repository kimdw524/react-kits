import { forwardRef } from 'react';

import clsx from 'clsx';

import { sx, type TypographyProperties } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Table.css';

interface TableProps extends UIComponent<'table'> {
  size?: TypographyProperties['fontSize'];
  isStriped?: boolean;
  isBordered?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    { isStriped, isBordered, className, size = 'md', sx: propSx, ...props },
    ref,
  ) => {
    return (
      <table
        ref={ref}
        className={clsx(
          s.table,
          isStriped && s.striped,
          isBordered && s.bordered,
          sx({ fontSize: size, ...propSx }),
          className,
        )}
        {...props}
      />
    );
  },
);
Table.displayName = 'Table';

export { s as tableCss };
