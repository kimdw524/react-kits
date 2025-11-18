import { ReactElement } from 'react';

import { Animated } from '@kimdw-rtk/animation';
import { Flex } from '@kimdw-rtk/ui';

interface FeatureDescriptionProps {
  children: ReactElement | ReactElement[];
}

export const FeatureDescription = ({ children }: FeatureDescriptionProps) => {
  return (
    <Flex
      gap="xl"
      alignItems="flex-start"
      flexDirection="column"
      style={{ flex: 1 }}
    >
      <Animated.Multi
        duration={500}
        initial={{ opacity: 0, transform: 'translateY(1rem)' }}
        animate={{ opacity: 1, transform: 'translateY(0)' }}
      >
        {children}
      </Animated.Multi>
    </Flex>
  );
};
