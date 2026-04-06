'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { SearchParamsProvider } from '../SearchParamsProvider';
import type { AdapterProps } from './types';

export const SearchParamsAdapter = ({ children, store }: AdapterProps) => {
  const searchParams = useSearchParams().toString();
  const cacheRef = useRef('');

  const a = searchParams === '' ? searchParams : `?${searchParams}`,
    b = typeof window !== 'undefined' ? window.location.search : '';

  useEffect(() => {
    if (a !== b) {
      cacheRef.current = a;
    }
  }, [a, b]);

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
    <SearchParamsProvider value={a === b ? cacheRef.current : a}>
      {children}
    </SearchParamsProvider>
  );
};
