'use client';

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { OverlayProvider, type OverlayOption } from '@kimdw-rtk/utils';

import { ContainerProvider, ToastProvider } from '#hooks';

import * as overlayStyle from '../styles/overlay.css';

interface UIProviderProps {
  children: ReactNode;
  container: HTMLElement;
  overlayUnmountOn?: OverlayOption['unmountOn'];
}

export const UIProvider = ({
  children,
  container,
  overlayUnmountOn = 'transitionEnd',
}: UIProviderProps) => {
  return (
    <ContainerProvider container={container}>
      {createPortal(
        <OverlayProvider
          className={{ ...overlayStyle }}
          unmountOn={overlayUnmountOn}
        >
          <ToastProvider>{children}</ToastProvider>
        </OverlayProvider>,
        container,
      )}
    </ContainerProvider>
  );
};
