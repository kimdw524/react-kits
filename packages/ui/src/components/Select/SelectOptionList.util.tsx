export const setListPosition = (
  container: HTMLElement,
  parent: HTMLElement,
) => {
  const parentRect = parent.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(container);
  const margin =
    (Number.parseFloat(computedStyle.marginTop) || 0) +
    (Number.parseFloat(computedStyle.marginBottom) || 0);
  const viewportHeight = document.documentElement.clientHeight;
  const spaceAbove = parentRect.top;
  const spaceBelow = viewportHeight - parentRect.bottom;
  const nextIsBelow =
    containerRect.height + margin <= spaceBelow || spaceBelow >= spaceAbove;
  const availableHeight = (nextIsBelow ? spaceBelow : spaceAbove) - margin;

  container.style.top = nextIsBelow ? `${parentRect.bottom}px` : '';
  container.style.bottom = nextIsBelow
    ? ''
    : `${viewportHeight - parentRect.top}px`;
  container.style.left = `${parentRect.left}px`;
  container.style.width = `${parentRect.width}px`;
  container.style.maxHeight = `${Math.max(availableHeight, 0)}px`;
  container.style.transformOrigin = nextIsBelow ? 'top' : 'bottom';
};
