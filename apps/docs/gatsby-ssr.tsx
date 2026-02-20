import { ReactNode } from 'react';

import { UIProvider } from '@kimdw-rtk/ui';
import type { GatsbySSR } from 'gatsby';

export const wrapRootElement = ({ element }: { element: ReactNode }) => {
  const container =
    typeof document === 'undefined'
      ? ({} as HTMLElement)
      : document.getElementById('container')!;
  return <UIProvider container={container}>{element}</UIProvider>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setBodyAttributes,
}) => {
  setBodyAttributes({
    className: 'light',
  });
};
