interface FloatingRect {
  bottom: number;
  height: number;
  left: number;
  top: number;
  width: number;
}

interface ViewportSize {
  height: number;
  width: number;
}

type VerticalPlacement = 'top' | 'bottom';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

export const getViewportSize = (): ViewportSize => ({
  height: document.documentElement.clientHeight,
  width: document.documentElement.clientWidth,
});

export const getElementBlockMargin = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element);

  return (
    (Number.parseFloat(computedStyle.marginTop) || 0) +
    (Number.parseFloat(computedStyle.marginBottom) || 0)
  );
};

export const getVerticalFloatingPlacement = ({
  anchorRect,
  floatingRect,
  viewportHeight = getViewportSize().height,
  margin = 0,
}: {
  anchorRect: Pick<FloatingRect, 'bottom' | 'top'>;
  floatingRect: Pick<FloatingRect, 'height'>;
  viewportHeight?: number;
  margin?: number;
}) => {
  const spaceAbove = anchorRect.top;
  const spaceBelow = viewportHeight - anchorRect.bottom;
  const isBelow =
    floatingRect.height + margin <= spaceBelow || spaceBelow >= spaceAbove;
  const availableHeight = (isBelow ? spaceBelow : spaceAbove) - margin;

  return {
    availableHeight: Math.max(availableHeight, 0),
    placement: (isBelow ? 'bottom' : 'top') as VerticalPlacement,
  };
};

export const getCenteredFloatingPosition = ({
  anchorRect,
  floatingRect,
  offset = 0,
  placement,
  viewportPadding = 0,
  viewportSize = getViewportSize(),
}: {
  anchorRect: Pick<
    FloatingRect,
    'bottom' | 'height' | 'left' | 'top' | 'width'
  >;
  floatingRect: Pick<FloatingRect, 'height' | 'width'>;
  offset?: number;
  placement: VerticalPlacement;
  viewportPadding?: number;
  viewportSize?: ViewportSize;
}) => {
  const centeredLeft =
    anchorRect.left + anchorRect.width / 2 - floatingRect.width / 2;
  const top =
    placement === 'bottom'
      ? anchorRect.bottom + offset
      : anchorRect.top - floatingRect.height - offset;

  return {
    left: clamp(
      centeredLeft,
      viewportPadding,
      viewportSize.width - floatingRect.width - viewportPadding,
    ),
    top: clamp(
      top,
      viewportPadding,
      viewportSize.height - floatingRect.height - viewportPadding,
    ),
  };
};

export const getCenteredFloatingShift = ({
  anchorRect,
  floatingRect,
  viewportPadding = 0,
  viewportWidth = getViewportSize().width,
}: {
  anchorRect: Pick<FloatingRect, 'left' | 'width'>;
  floatingRect: Pick<FloatingRect, 'width'>;
  viewportPadding?: number;
  viewportWidth?: number;
}) => {
  const centeredLeft =
    anchorRect.left + anchorRect.width / 2 - floatingRect.width / 2;
  const nextLeft = clamp(
    centeredLeft,
    viewportPadding,
    viewportWidth - floatingRect.width - viewportPadding,
  );

  return nextLeft - centeredLeft;
};
