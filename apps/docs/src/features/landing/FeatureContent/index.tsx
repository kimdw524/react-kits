import { ReactNode } from 'react';

import { Animated } from '@kimdw-rtk/animation';

import * as s from './style.css';

interface FeatureContentProps {
  children: ReactNode;
}

export const FeatureContent = ({ children }: FeatureContentProps) => {
  return (
    <Animated.Single
      duration={500}
      initial={{ opacity: 0, transform: 'scale(0.9)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
    >
      <div className={s.container}>{children}</div>
    </Animated.Single>
  );
};
