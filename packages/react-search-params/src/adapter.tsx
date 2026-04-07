'use client';

import { useEffect } from 'react';

import { SearchParamsProvider } from './SearchParamsProvider';
import type { AdapterProps } from './adapters/types';

export const SearchParamsAdapter = ({ children, store }: AdapterProps) => {
  useEffect(() => {
    const wrapHistoryMethods = (onChange: () => void) => {
      const { history } = window;
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        originalPushState.apply(this, args);
        onChange();
      };

      history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        onChange();
      };

      return () => {
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    };

    const handleSearchChange = () => {
      store.updateFromSearch();
    };

    const cleanupWrapHistoryMethods = wrapHistoryMethods(handleSearchChange);
    window.addEventListener('popstate', handleSearchChange);

    return () => {
      cleanupWrapHistoryMethods();
      window.removeEventListener('popstate', handleSearchChange);
    };
  }, [store]);

  return (
    <SearchParamsProvider
      value={
        typeof window === 'undefined'
          ? ''
          : window.location.search.replace(/^\?/, '')
      }
    >
      {children}
    </SearchParamsProvider>
  );
};
