import { ReactNode } from 'react';

import { UIProvider } from '@kimdw-rtk/ui';

export const wrapRootElement = ({ element }: { element: ReactNode }) => {
  const container = document.getElementById('container')!;
  return <UIProvider container={container}>{element}</UIProvider>;
};
