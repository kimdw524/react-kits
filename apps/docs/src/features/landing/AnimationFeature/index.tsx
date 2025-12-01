import { Typography } from '@kimdw-rtk/ui';
import { StaticImage } from 'gatsby-plugin-image';

import { FeatureBox } from '../FeatureBox';
import { FeatureCard } from '../FeatureCard';
import { FeatureContent } from '../FeatureContent';
import { FeatureDescription } from '../FeatureDescription';

export const AnimationFeature = () => {
  return (
    <FeatureBox header="Easy Animations" isReverse={true}>
      <FeatureDescription>
        <FeatureCard header="Performance">
          <Typography lineHeight="md">
            Offers non-CPU-intensive animations.
            <br />
            Supports building simple animations with optimal performance.
          </Typography>
        </FeatureCard>
        <FeatureCard header="Unmount Animation Support">
          <Typography lineHeight="md">
            Implement React unmount animations with <i>TransitionGroup</i> and{' '}
            <i>CSSTransition</i>.
          </Typography>
        </FeatureCard>
      </FeatureDescription>
      <FeatureContent>
        <StaticImage
          src="../../../assets/images/animation.png"
          alt="Animation Image"
          placeholder="blurred"
          layout="fullWidth"
        />
      </FeatureContent>
    </FeatureBox>
  );
};
