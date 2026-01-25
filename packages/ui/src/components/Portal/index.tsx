'use client';

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useContainer } from '#hooks';

interface PortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const container = useContainer();

  return container !== undefined && createPortal(children, container);
};
