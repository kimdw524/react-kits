import { Box, Button, Flex, Typography } from '@kimdw-rtk/ui';
import type { HeadFC, PageProps } from 'gatsby';

import { Layout } from '#components';
import '#styles/globalStyle.css';

import { FeatureCard } from '../components/Landing/FeatureCard';

const LandingPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Box paddingX="xl">
        {/* Summary and Link */}
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
            that centralizes components, hooks, utilities, and animations.
          </Typography>
          <Flex gap="lg" justifyContent="center" marginTop="3xl">
            <Button size="lg">Get Started</Button>
            <Button color="secondary" size="lg">
              Try It Live
            </Button>
          </Flex>
        </Box>

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
    <body className="light" />
  </>
);
