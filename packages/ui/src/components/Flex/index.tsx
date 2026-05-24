import { forwardRef, type ComponentProps } from 'react';

import clsx from 'clsx';

import { Box } from '../Box';
import * as s from './Flex.css';

type FlexProps = ComponentProps<typeof Box>;

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, ...rest }, ref) => {
    return <Box className={clsx(s.flex, className)} {...rest} ref={ref} />;
  },
);
Flex.displayName = 'Flex';
