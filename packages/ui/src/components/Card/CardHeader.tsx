import { forwardRef, type ComponentProps } from 'react';

import { clsx } from 'clsx';

import { Box } from '#components';
import { sx } from '#styles';

type CardHeaderProps = ComponentProps<typeof Box>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, sx: propSx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={clsx(className, sx(propSx))}
        padding="md"
        paddingBottom="none"
        {...props}
      />
    );
  },
);
CardHeader.displayName = 'CardHeader';
