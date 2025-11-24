import { Animated } from '@kimdw-rtk/animation';
import { Box, Button, Flex, Typography } from '@kimdw-rtk/ui';
import { Link } from 'gatsby';

import { Center } from '@/shared/components';

export const HeroSection = () => {
  return (
    <Center>
      <Box textAlign="center">
        <Animated.Box
          duration={1000}
          initial={{ opacity: 0, transform: 'translateY(2rem)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <Typography
            as="p"
            fontSize="5xl"
            fontWeight="black"
            letterSpacing="1px"
            gradientFrom="blue-700"
            gradientTo="blue-300"
            isGradient
          >
            An all-in-one React toolkit
          </Typography>
          <Typography
            as="p"
            color="blue-900"
            fontSize="xl"
            fontWeight="semiBold"
            lineHeight="md"
            sx={{ marginTop: 'xl' }}
          >
            <Animated.Text
              duration={750}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              that centralizes components, utilities, and animations.
            </Animated.Text>
          </Typography>
        </Animated.Box>
        <Animated.Box
          duration={500}
          delay={500}
          initial={{ opacity: 0, transform: 'translateY(1.5rem)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <Flex
            flexWrap="wrap"
            gap="lg"
            justifyContent="center"
            marginTop="3xl"
          >
            <Link to="https://github.com/kimdw524/react-kits" target="_blank">
              <Button sx={{ padding: '2xl', fontWeight: 'medium' }}>
                Get Started
              </Button>
            </Link>
            <Link to="/theme">
              <Button
                color="accent"
                variant="outlined"
                sx={{ padding: '2xl', fontWeight: 'medium' }}
              >
                Customize the Theme
              </Button>
            </Link>
          </Flex>
        </Animated.Box>
      </Box>
    </Center>
  );
};
