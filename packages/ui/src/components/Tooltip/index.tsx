'use client';

import {
  cloneElement,
  useState,
  type PointerEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';

import clsx from 'clsx';

import { Portal } from '#components';
import { sprinkles } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Tooltip.css';

interface TooltipProps extends Omit<UIComponent<'div'>, 'content'> {
  children: ReactElement<{
    onPointerOver?: PointerEventHandler;
    onPointerOut?: PointerEventHandler;
  }>;
  content: ReactNode;
  size?: keyof typeof typography.size;
}

export const Tooltip = ({
  children,
  content,
  size = 'sm',
  className,
  style,
  ...rest
}: TooltipProps) => {
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
            className={clsx(
              s.tooltip,
              sprinkles({ fontSize: size }),
              className,
            )}
            style={{ top: position.y, left: position.x, ...style }}
            {...rest}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
};
