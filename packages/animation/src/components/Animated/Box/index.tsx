import type { ComponentProps, ReactNode } from 'react';

import { Single } from '../Single';

export interface BoxProps
  extends Omit<ComponentProps<typeof Single>, 'children'> {
  children: ReactNode;
}

export const Box = ({ children, ...rest }: BoxProps) => {
  return (
    <Single {...rest}>
      <div>{children}</div>
    </Single>
  );
};
