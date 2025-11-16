import { ComponentProps } from 'react';

import * as s from './GridItem.css';

interface GridItemProps extends ComponentProps<'div'> {
  color: string;
}

export const GridItem = ({ color, ...rest }: GridItemProps) => {
  return (
    <div
      className={s.gridItem}
      style={{
        backgroundColor: color,
      }}
      {...rest}
    />
  );
};
