import { ReactNode } from 'react';

import { Animated } from '@kimdw-rtk/animation';
import { Box, Flex, Typography } from '@kimdw-rtk/ui';

interface FeatureBoxProps {
  children: ReactNode;
  header: string;
  isReverse?: boolean;
}

export const FeatureBox = ({
  children,
  header,
  isReverse = false,
}: FeatureBoxProps) => {
  return (
    <Box textAlign="center" paddingY="xl" width="100%">
      <Typography
        color="accent-foreground"
        fontSize="4xl"
        fontWeight="bold"
        letterSpacing="1px"
        sx={{ paddingY: 'xl' }}
      >
        <Animated.Text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          duration={500}
        >
          {header}
        </Animated.Text>
      </Typography>
      <Box marginTop="xl">
        <Flex
          gap="xl"
          flexDirection={{
            mobile: 'column-reverse',
            desktop: isReverse ? 'row-reverse' : 'row',
          }}
        >
          {children}
        </Flex>
      </Box>
    </Box>
  );
};
