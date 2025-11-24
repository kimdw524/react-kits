'use client';

import type { ReactNode } from 'react';

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
      <ToastProvider>
        <OverlayProvider
          className={{ ...overlayStyle }}
          container={container}
          unmountOn={overlayUnmountOn}
        >
          {children}
        </OverlayProvider>
      </ToastProvider>
    </ContainerProvider>
  );
};
