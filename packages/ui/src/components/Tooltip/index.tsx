'use client';

import {
  cloneElement,
  useState,
  type PointerEventHandler,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';

import { useContainer } from '#hooks';

import * as s from './Tooltip.css';

interface TooltipProps {
  children: ReactElement<{
    onPointerOver?: PointerEventHandler;
    onPointerOut?: PointerEventHandler;
  }>;
}

export const Tooltip = ({ children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const container = useContainer();

  const handlePointerOver = (e: React.PointerEvent) => {
    setIsVisible(true);
    children.props?.onPointerOver?.(e);
  };

  const handlePointerOut = (e: React.PointerEvent) => {
    setIsVisible(false);
    children.props?.onPointerOut?.(e);
  };

  return (
    <>
      {cloneElement(children, {
        onPointerOver: handlePointerOver,
        onPointerOut: handlePointerOut,
      })}
      {isVisible &&
        createPortal(<div className={s.tooltip}>tooltip</div>, container)}
    </>
  );
};
