'use client';

import {
  cloneElement,
  useLayoutEffect,
  useRef,
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
import {
  getCenteredFloatingShift,
  getCenteredFloatingPosition,
  getVerticalFloatingPlacement,
} from '#utils';

import * as s from './Tooltip.css';

const TOOLTIP_OFFSET = 4;
const TOOLTIP_VIEWPORT_PADDING = 8;

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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [translateX, setTranslateX] = useState(0);

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;

    if (!isVisible || !tooltip || !anchorRect) {
      return;
    }

    const tooltipRect = tooltip.getBoundingClientRect();
    const { placement } = getVerticalFloatingPlacement({
      anchorRect,
      floatingRect: tooltipRect,
      margin: TOOLTIP_OFFSET + TOOLTIP_VIEWPORT_PADDING,
    });
    const nextPosition = getCenteredFloatingPosition({
      anchorRect,
      floatingRect: tooltipRect,
      offset: TOOLTIP_OFFSET,
      placement,
      viewportPadding: TOOLTIP_VIEWPORT_PADDING,
    });
    const nextTranslateX = getCenteredFloatingShift({
      anchorRect,
      floatingRect: tooltipRect,
      viewportPadding: TOOLTIP_VIEWPORT_PADDING,
    });

    setPosition({
      x: anchorRect.left + anchorRect.width / 2,
      y: nextPosition.top,
    });
    setTranslateX(nextTranslateX);
  }, [anchorRect, className, content, isVisible, size, style]);

  const handlePointerOver = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setIsVisible(true);
    setAnchorRect(rect);
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + TOOLTIP_OFFSET,
    });
    setTranslateX(0);
    children.props?.onPointerOver?.(e);
  };

  const handlePointerOut = (e: React.PointerEvent) => {
    setIsVisible(false);
    setAnchorRect(null);
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
            ref={tooltipRef}
            className={clsx(
              s.tooltip,
              sprinkles({ fontSize: size }),
              className,
            )}
            style={{
              top: position.y,
              left: position.x,
              transform: `translateX(calc(-50% + ${translateX}px))`,
              ...style,
            }}
            {...rest}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
};
