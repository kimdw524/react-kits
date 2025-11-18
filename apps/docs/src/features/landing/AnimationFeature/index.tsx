import { Typography } from '@kimdw-rtk/ui';

import { FeatureBox } from '../FeatureBox';
import { FeatureCard } from '../FeatureCard';
import { FeatureContent } from '../FeatureContent';
import { FeatureDescription } from '../FeatureDescription';

export const AnimationFeature = () => {
  return (
    <FeatureBox header="Easy Animation" isReverse={true}>
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
        <img
          src="/images/features_animation.png"
          alt="Animation"
          style={{ width: '100%' }}
        />
      </FeatureContent>
    </FeatureBox>
  );
};
