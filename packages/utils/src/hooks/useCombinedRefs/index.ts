'use client';

import { useMemo, useRef } from 'react';

export const useCombinedRefs = <T>(...refs: (React.Ref<T> | undefined)[]) => {
  const targetRef = useRef<T | null>(null);
  const refsRef = useRef(refs);

  refsRef.current = refs;

  return useMemo(
    () =>
      ({
        get current() {
          return targetRef.current;
        },
        set current(value: T | null) {
          targetRef.current = value;
          refsRef.current.forEach((ref) => {
            if (!ref) {
              return;
            }

            if (typeof ref === 'function') {
              ref(value);
              return;
            }

            (ref as React.MutableRefObject<T | null>).current = value;
          });
        },
      }) as React.MutableRefObject<T | null>,
    [],
  );
};
