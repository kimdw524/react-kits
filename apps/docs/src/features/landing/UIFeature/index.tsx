import { Typography } from '@kimdw-rtk/ui';
import { StaticImage } from 'gatsby-plugin-image';

import { FeatureBox } from '../FeatureBox';
import { FeatureCard } from '../FeatureCard';
import { FeatureContent } from '../FeatureContent';
import { FeatureDescription } from '../FeatureDescription';

export const UIFeature = () => {
  return (
    <FeatureBox header="Fast UI Development">
      <FeatureDescription>
        <FeatureCard header="20+ Components">
          <Typography lineHeight="md">
            Includes more than 20 UI components, along with overlay components
            such as Alert, Confirm, Toast, and Tooltip.
          </Typography>
        </FeatureCard>
        <FeatureCard header="Utility Class Support">
          <Typography lineHeight="md">
            Provides a utility-class system that lets you build precise UI
            layouts without writing additional CSS.
          </Typography>
        </FeatureCard>
        <FeatureCard header="Customizable Theme">
          <Typography lineHeight="md">
            Customize the theme easily by adjusting just a few token values.
            <br />A tool is also available to preview and tweak colors
            effortlessly.
          </Typography>
        </FeatureCard>
      </FeatureDescription>
      <FeatureContent>
        <StaticImage
          src="../../../assets/images/ui.png"
          alt="UI Image"
          placeholder="blurred"
          layout="fullWidth"
        />
      </FeatureContent>
    </FeatureBox>
  );
};
