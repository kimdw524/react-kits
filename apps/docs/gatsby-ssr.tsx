import { ReactNode } from 'react';

import { UIProvider } from '@kimdw-rtk/ui';
import { OverlayProvider } from '@kimdw-rtk/utils';
import type { GatsbySSR } from 'gatsby';

export const wrapRootElement = ({ element }: { element: ReactNode }) => {
  const container =
    typeof document === 'undefined'
      ? ({} as HTMLElement)
      : document.getElementById('container')!;
  return (
    <OverlayProvider container={container}>
      <UIProvider container={container}>{element}</UIProvider>
    </OverlayProvider>
  );
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setBodyAttributes,
}) => {
  setBodyAttributes({
    className: 'light',
  });
};
