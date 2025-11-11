'use client';

import { useEffect, useState } from 'react';

export const useHasAppeared = <T extends HTMLElement | null>(
  targetRef: React.RefObject<T>,
) => {
  const [hasAppeared, setHasAppeared] = useState<boolean>(false);

  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setHasAppeared((prev) => prev || entry.isIntersecting);

        if (entry.isIntersecting) {
          observer.disconnect();
          return;
        }
      });
    };

    const observer = new window.IntersectionObserver(observerCallback, {
      threshold: 0,
    });

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [targetRef]);

  return { hasAppeared };
};
