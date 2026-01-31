'use client';

import { useLayoutEffect } from 'react';

interface UsePreventScrollOptions {
  /** 스크롤바를 숨겨도 body에 원래 스크롤바 width만큼 padding-right를 적용할지 여부 */
  preservePadding?: boolean;
}

/**
 * body의 스크롤을 제거합니다.
 */
export const usePreventScroll = ({
  preservePadding = true,
}: UsePreventScrollOptions = {}) => {
  useLayoutEffect(() => {
    const isScrollable = document.body.style.overflowY !== 'hidden';
    const scrollBarWidth = preservePadding
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    // 해당 hook이 여러 번 호출되 상황을 고려하여, 현재 컴포넌트가 스크롤을 제거했을 때만 다시 복구한다.
    if (isScrollable) {
      document.body.style.overflowY = 'hidden';
      if (preservePadding) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    }

    return () => {
      if (isScrollable) {
        if (preservePadding) {
          document.body.style.removeProperty('padding-right');
        }
        document.body.style.removeProperty('overflow-y');
      }
    };
  }, [preservePadding]);
};
