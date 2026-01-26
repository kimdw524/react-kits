'use client';

import { createContext, type ReactNode } from 'react';

export const ContainerContext = createContext<HTMLElement | undefined>(
  undefined,
);

interface ContainerProviderProps {
  children: ReactNode;
  container?: HTMLElement;
}

export const ContainerProvider = ({
  children,
  container,
}: ContainerProviderProps) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};
