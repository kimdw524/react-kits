'use client';

import { useEffect, useState } from 'react';

export const useIsScrolled = <T extends (HTMLElement | null) | typeof window>(
  element: T,
) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (element === null) {
      return;
    }

    const handleScroll = () => {
      if (element instanceof Window) {
        setIsScrolled(element.scrollY !== 0);
        return;
      }

      setIsScrolled(element.scrollTop !== 0);
    };

    handleScroll();

    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [element]);

  return isScrolled;
};
