import { Animated } from '@kimdw-rtk/animation';
import { Box, Button, Flex, Typography } from '@kimdw-rtk/ui';
import { Link, type HeadFC, type PageProps } from 'gatsby';

import { FeatureCard } from '@/features/landing';
import { Layout } from '@/shared/components';

const LandingPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Box paddingX="xl">
        {/* Summary and Link */}
        <Animated.Box
          duration={1000}
          initial={{ opacity: 0, transform: 'translateY(2rem)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <Box
            marginTop="5xl"
            paddingX="lg"
            paddingY={{ mobile: '3xl', desktop: '5xl' }}
            textAlign="center"
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
                that centralizes components, hooks, utilities, and animations.
              </Animated.Text>
            </Typography>
            <Flex gap="lg" justifyContent="center" marginTop="3xl">
              <Button size="lg">Get Started</Button>
              <Link to="/theme">
                <Button color="secondary" size="lg">
                  Customize the theme
                </Button>
              </Link>
            </Flex>
          </Box>
        </Animated.Box>

        {/* Feature */}
        <Flex gap="lg" flexDirection={{ mobile: 'column', desktop: 'row' }}>
          <FeatureCard name="UI Components" packageName="@kimdw-rtk/ui">
            <ol>
              <li>Customizable</li>
              <li>Responsive</li>
              <li>Consistent</li>
            </ol>
          </FeatureCard>
          <FeatureCard name="Utils" packageName="@kimdw-rtk/utils">
            <ol>
              <li>Convenient</li>
            </ol>
          </FeatureCard>
          <FeatureCard name="Animation" packageName="@kimdw-rtk/animation">
            <ol>
              <li>Elegant</li>
              <li>Compatible</li>
            </ol>
          </FeatureCard>
        </Flex>
      </Box>
    </Layout>
  );
};

export default LandingPage;

export const Head: HeadFC = () => (
  <>
    <title>Home Page</title>
  </>
);
