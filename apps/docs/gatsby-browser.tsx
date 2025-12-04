import { ReactNode } from 'react';

import { UIProvider } from '@kimdw-rtk/ui';
import { OverlayProvider } from '@kimdw-rtk/utils';

export const wrapRootElement = ({ element }: { element: ReactNode }) => {
  const container = document.getElementById('container')!;
  return (
    <OverlayProvider container={container}>
      <UIProvider container={container}>{element}</UIProvider>
    </OverlayProvider>
  );
};
