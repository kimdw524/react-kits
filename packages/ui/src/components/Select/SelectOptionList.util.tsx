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
  const containerRect = container.getBoundingClientRect();
  const margin = getElementBlockMargin(container);
  const { height: viewportHeight } = getViewportSize();
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
  container.style.left = `${parentRect.left}px`;
  container.style.width = `${parentRect.width}px`;
  container.style.maxHeight = `${availableHeight}px`;
  container.style.transformOrigin = isBelow ? 'top' : 'bottom';
};
