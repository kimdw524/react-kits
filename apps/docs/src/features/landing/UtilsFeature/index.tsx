import { Typography } from '@kimdw-rtk/ui';
import { StaticImage } from 'gatsby-plugin-image';

import { FeatureBox } from '../FeatureBox';
import { FeatureCard } from '../FeatureCard';
import { FeatureContent } from '../FeatureContent';
import { FeatureDescription } from '../FeatureDescription';

export const UtilsFeature = () => {
  return (
    <FeatureBox header="Enhance DX and UX">
      <FeatureDescription>
        <FeatureCard header="Utility Kit">
          <Typography lineHeight="md">
            Offers modules essential for web development.
          </Typography>
        </FeatureCard>
        <FeatureCard header="Boilerplate Reduction">
          <Typography lineHeight="md">
            Provides HOC that help you reduce boilerplate code significantly.
          </Typography>
        </FeatureCard>
        <FeatureCard header="Performance Optimization">
          <Typography lineHeight="md">
            Apply rendering performance optimizations simply by wrapping your
            components with an HOC.
          </Typography>
        </FeatureCard>
      </FeatureDescription>
      <FeatureContent>
        <StaticImage
          src="../../../assets/images/utils.png"
          alt="Utils Image"
          placeholder="blurred"
          layout="fullWidth"
        />
      </FeatureContent>
    </FeatureBox>
  );
};
