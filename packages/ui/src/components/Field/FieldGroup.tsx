import { forwardRef, type ComponentProps } from 'react';

import { Flex } from '../Flex';

type FieldGroupProps = ComponentProps<typeof Flex>;

export const FieldGroup = forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ flexDirection = 'column', gap = 'md', ...props }, ref) => {
    return (
      <Flex ref={ref} flexDirection={flexDirection} gap={gap} {...props} />
    );
  },
);
FieldGroup.displayName = 'FieldGroup';
