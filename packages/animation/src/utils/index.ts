import type { AnimationStyle } from '#types';

export const setStyle = <T extends HTMLElement>(
  element: T,
  style: AnimationStyle,
) => {
  if (typeof style === 'string') {
    element.classList.add(style);
    return;
  }

  Object.assign(element.style, style);
};

export const removeStyle = <T extends HTMLElement>(
  element: T,
  style: AnimationStyle,
) => {
  if (typeof style === 'string') {
    element.classList.remove(style);
    return;
  }

  for (const key in style) {
    element.style.removeProperty(key);
  }
};
