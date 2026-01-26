'use client';

import { useContext } from 'react';

import { ContainerContext } from './ContainerProvider';

export const useContainer = () => {
  const containerContext = useContext(ContainerContext);

  return containerContext;
};
