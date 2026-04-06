'use client';

import { createContext, useContext, type ReactNode } from 'react';

const SearchParamsContext = createContext<string | null>(null);
const InitialSearchParamsContext = createContext<SearchParams | null>(null);

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * Provides search params through React Context as a string.
 */
export const SearchParamsProvider = ({
  children,
  value,
}: {
  children?: ReactNode;
  value: string;
}) => {
  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  );
};

/**
 * Returns string-form search params from `SearchParamsProvider`.
 */
export const useSearchParams = () => {
  const value = useContext(SearchParamsContext);
  return value;
};

/**
 * Provides initial search params through React Context.
 */
export const InitialSearchParamsProvider = ({
  children,
  value,
}: {
  children?: ReactNode;
  value: SearchParams;
}) => {
  return (
    <InitialSearchParamsContext.Provider value={value}>
      {children}
    </InitialSearchParamsContext.Provider>
  );
};

/**
 * Returns initial search params values from `InitialSearchParamsProvider`.
 */
export const useInitialSearchParams = () => {
  const value = useContext(InitialSearchParamsContext);
  return value;
};
