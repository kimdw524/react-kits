'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { SearchParamsProvider } from '../SearchParamsProvider';
import type { AdapterProps } from './types';

export const SearchParamsAdapter = ({ children, store }: AdapterProps) => {
  const searchParams = useSearchParams()?.toString() ?? '';

  const next = searchParams === '' ? searchParams : `?${searchParams}`,
    url = typeof window !== 'undefined' ? window.location.search : '';

  const prevRef = useRef(url);

  useEffect(() => {
    if (next !== url) {
      prevRef.current = next;
    }
  }, [next, url]);

  useEffect(() => {
    const handleSearchChange = () => {
      store.updateFromSearch();
    };

    window.addEventListener('popstate', handleSearchChange);

    return () => {
      window.removeEventListener('popstate', handleSearchChange);
    };
  }, [store]);

  return (
    <SearchParamsProvider value={next === url ? prevRef.current : next}>
      {children}
    </SearchParamsProvider>
  );
};
