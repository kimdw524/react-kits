'use client';

import { createContext, useContext, type ReactNode } from 'react';

const SearchParamsContext = createContext<SearchParams | null>(null);

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * Provides SSR-derived search params initial values through React Context.
 */
export const SearchParamsProvider = ({
  children,
  value,
}: {
  children?: ReactNode;
  value: SearchParams;
}) => {
  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  );
};

/**
 * Returns initial search params values from `SearchParamsProvider`.
 */
export const useInitialSearchParams = () => {
  const value = useContext(SearchParamsContext);
  return value;
};
