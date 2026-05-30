import { forwardRef, type ComponentProps } from 'react';

import { Flex } from '../Flex';

type FieldProps = ComponentProps<typeof Flex>;

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ flexDirection = 'column', gap = 'md', ...props }, ref) => {
    return (
      <Flex ref={ref} flexDirection={flexDirection} gap={gap} {...props} />
    );
  },
);
Field.displayName = 'Field';
