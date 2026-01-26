import { useSyncExternalStore, type ReactNode } from 'react';

import { ContainerProvider } from '#hooks';

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const container = useSyncExternalStore(
    () => () => {},
    () => document.getElementById('container') ?? undefined,
    () => undefined,
  );

  return (
    <ContainerProvider container={container}>{children}</ContainerProvider>
  );
};
