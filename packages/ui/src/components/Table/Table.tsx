import { forwardRef } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';

import { sx } from '#styles';
import { spacing } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Table.css';

interface TableProps extends UIComponent<'table'> {
  size?: keyof typeof spacing;
  isStriped?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ isStriped, className, size = 'md', sx: propSx, style, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={clsx(s.table, isStriped && s.striped, sx(propSx), className)}
        style={{
          ...assignInlineVars({
            [s.paddingVar]: spacing[size],
          }),
          ...style,
        }}
        {...props}
      />
    );
  },
);
Table.displayName = 'Table';

export { s as tableCss };
