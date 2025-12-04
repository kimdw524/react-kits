import { Box, Flex } from '@kimdw-rtk/ui';
import { type HeadFC, type PageProps } from 'gatsby';

import {
  AnimationFeature,
  UIFeature,
  HeroSection,
  UtilsFeature,
} from '@/features/landing';
import { Layout } from '@/shared/components';

const LandingPage: React.FC<PageProps> = () => {
  return (
    <Layout size="lg">
      <Box paddingX="xl">
        <HeroSection />
        {/* Feature */}
        <section>
          <Flex flexDirection="column" style={{ gap: '20vh' }}>
            <UIFeature />
            <AnimationFeature />
            <UtilsFeature />
          </Flex>
        </section>
      </Box>
    </Layout>
  );
};

export default LandingPage;

export const Head: HeadFC = () => (
  <>
    <title>react-kits</title>
  </>
);
