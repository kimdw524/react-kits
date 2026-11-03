import {
  getElementBlockMargin,
  getVerticalFloatingPlacement,
  getViewportSize,
} from '#utils';

export const setListPosition = (
  container: HTMLElement,
  parent: HTMLElement,
) => {
  const parentRect = parent.getBoundingClientRect();
  container.style.minWidth = `${parentRect.width}px`;

  const containerRect = container.getBoundingClientRect();
  const margin = getElementBlockMargin(container);
  const { height: viewportHeight, width: viewportWidth } = getViewportSize();
  const { availableHeight, placement } = getVerticalFloatingPlacement({
    anchorRect: parentRect,
    floatingRect: containerRect,
    margin,
    viewportHeight,
  });
  const isBelow = placement === 'bottom';

  container.style.top = isBelow ? `${parentRect.bottom}px` : '';
  container.style.bottom = isBelow
    ? ''
    : `${viewportHeight - parentRect.top}px`;
  container.style.left = `${Math.max(
    0,
    Math.min(parentRect.left, viewportWidth - containerRect.width),
  )}px`;
  container.style.maxHeight = `${availableHeight}px`;
  container.style.transformOrigin = isBelow ? 'top' : 'bottom';
};
