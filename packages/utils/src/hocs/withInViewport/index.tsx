'use client';

import React, { useMemo, useRef } from 'react';

import { useIsInViewport } from '#hooks/useIsInViewport';

export const withInViewport = <P,>(
  Component:
    | React.ComponentType<P & React.RefAttributes<HTMLElement>>
    | (React.ForwardRefExoticComponent<P> & React.RefAttributes<HTMLElement>),
) => {
  const InViewportComponent = (props: P) => {
    const ref = useRef<HTMLElement>(null);
    const { isInViewport } = useIsInViewport(ref);

    const memo = useMemo(() => {
      if (isInViewport) {
        return;
      }

      return <Component ref={ref} {...props} />;
      // eslint-disable-next-line
    }, [isInViewport]);

    if (!isInViewport) {
      return memo;
    }

    return <Component ref={ref} {...props} />;
  };

  return InViewportComponent;
};
