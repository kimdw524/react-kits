'use client';

import {
  cloneElement,
  useState,
  type PointerEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';

import { Portal } from '#components';
import type { UIComponent } from '#types';

import * as s from './Tooltip.css';

interface TooltipProps
  extends Omit<UIComponent<'div', typeof s.tooltip>, 'content'> {
  children: ReactElement<{
    onPointerOver?: PointerEventHandler;
    onPointerOut?: PointerEventHandler;
  }>;
  content: ReactNode;
}

export const Tooltip = ({ children, content, size = 'sm' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handlePointerOver = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setIsVisible(true);
    setPosition({ x: rect.x + rect.width / 2, y: rect.y + rect.height + 4 });
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
      {isVisible && (
        <Portal>
          <div
            className={s.tooltip({ size })}
            style={{ top: position.y, left: position.x }}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
};
