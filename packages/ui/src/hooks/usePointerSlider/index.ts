'use client';

import { useEffect, useState } from 'react';

export const usePointerSlider = <T extends React.RefObject<HTMLElement | null>>(
  ref: T,
  {
    min,
    max,
    defaultValue,
  }: {
    min: number;
    max: number;
    defaultValue: number;
  },
): number => {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    const element = ref.current;

    if (element === null) {
      return;
    }

    const ownerWindow = element.ownerDocument.defaultView;

    if (ownerWindow === null) {
      return;
    }

    let isDragging = false,
      activePointerId: number | null = null,
      parentWidth = 0,
      parentX = 0;

    const setThumbPosition = (nextValue: number) => {
      element.style.left = `${((nextValue - min) / (max - min)) * 100}%`;
    };

    const syncParentRect = () => {
      const boundingRect = element.parentElement?.getBoundingClientRect();

      if (boundingRect === undefined) {
        return false;
      }

      parentWidth = boundingRect.width;
      parentX = boundingRect.x;

      return parentWidth > 0;
    };

    const updateValue = (clientX: number) => {
      if (parentWidth <= 0 || !Number.isFinite(clientX)) {
        return;
      }

      const currentValue = Math.min(
        max,
        Math.max(
          min,
          Math.round((clientX - parentX) / (parentWidth / (max - min))) + min,
        ),
      );

      setThumbPosition(currentValue);
      setValue(currentValue);
    };

    setValue(defaultValue);
    setThumbPosition(defaultValue);

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) {
        return;
      }

      if (!syncParentRect()) {
        return;
      }

      e.preventDefault();

      isDragging = true;
      activePointerId = Number.isFinite(e.pointerId) ? e.pointerId : null;

      if (
        activePointerId !== null &&
        element.hasPointerCapture?.(activePointerId) === false
      ) {
        element.setPointerCapture?.(activePointerId);
      }

      updateValue(e.clientX);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (
        !isDragging ||
        (activePointerId !== null && activePointerId !== e.pointerId)
      ) {
        return;
      }

      updateValue(e.clientX);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (activePointerId !== null && activePointerId !== e.pointerId) {
        return;
      }

      if (
        activePointerId !== null &&
        element.hasPointerCapture?.(activePointerId)
      ) {
        element.releasePointerCapture?.(activePointerId);
      }

      isDragging = false;
      activePointerId = null;
    };

    const handleLostPointerCapture = () => {
      isDragging = false;
      activePointerId = null;
    };

    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointercancel', handlePointerUp);
    element.addEventListener('lostpointercapture', handleLostPointerCapture);
    ownerWindow.addEventListener('pointermove', handlePointerMove);
    ownerWindow.addEventListener('pointerup', handlePointerUp);
    ownerWindow.addEventListener('pointercancel', handlePointerUp);

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointercancel', handlePointerUp);
      element.removeEventListener(
        'lostpointercapture',
        handleLostPointerCapture,
      );
      ownerWindow.removeEventListener('pointermove', handlePointerMove);
      ownerWindow.removeEventListener('pointerup', handlePointerUp);
      ownerWindow.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [ref, max, min, defaultValue]);

  return value;
};
