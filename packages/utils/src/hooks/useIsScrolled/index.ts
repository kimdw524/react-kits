'use client';

import { useEffect, useState, type RefObject } from 'react';

export const useIsScrolled = <
  T extends RefObject<HTMLElement | null> | typeof window,
>(
  element: T,
) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const current = element instanceof Window ? element : element.current;
    if (current === null) {
      return;
    }

    const handleScroll = () => {
      if (current instanceof window.Window) {
        setIsScrolled(current?.scrollY !== 0);
        return;
      }

      setIsScrolled(current?.scrollTop !== 0);
    };

    handleScroll();

    current?.addEventListener('scroll', handleScroll);

    return () => {
      current?.removeEventListener('scroll', handleScroll);
    };
  }, [element]);

  return isScrolled;
};
