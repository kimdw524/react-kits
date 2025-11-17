import { ReactNode } from 'react';

import { UIProvider } from '@kimdw-rtk/ui';
import { OverlayProvider } from '@kimdw-rtk/utils';

export const wrapRootElement = ({ element }: { element: ReactNode }) => {
  return (
    <OverlayProvider>
      <UIProvider container={document.getElementById('container')!}>
        {element}
      </UIProvider>
    </OverlayProvider>
  );
};
