import { forwardRef, type ComponentProps } from 'react';

import { Flex } from '../Flex';

type FieldDescriptionProps = ComponentProps<typeof Flex>;

export const FieldDescription = forwardRef<
  HTMLDivElement,
  FieldDescriptionProps
>(
  (
    {
      color = 'muted-foreground',
      fontSize = 'sm',
      lineHeight = 'md',
      ...props
    },
    ref,
  ) => {
    return (
      <Flex
        ref={ref}
        color={color}
        fontSize={fontSize}
        lineHeight={lineHeight}
        {...props}
      />
    );
  },
);
FieldDescription.displayName = 'FieldDescription';
