import { useEffect, type ReactNode } from 'react';

import { SearchParamsProvider } from '#SearchParamsProvider';
import type { SearchParamsStore } from '#createSearchParamsStore';

export const SearchParamsAdapter = ({
  children,
  store,
}: {
  children?: ReactNode;
  store: SearchParamsStore;
}) => {
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
