'use client';

import { useEffect } from 'react';

export const useViewportObserver = <T extends HTMLElement | null>({
  ref,
}: {
  ref: React.RefObject<T>;
}): void => {
  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    let cleanup: ReturnType<typeof callback> | undefined;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          if (cleanup) {
            cleanup();
            cleanup = undefined;
          }
          return;
        }

        cleanup = callback();
      });
    };

    const observer = new window.IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, [targetRef, threshold]);
};
