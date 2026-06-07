'use client';

import { forwardRef, useEffect, useRef } from 'react';

import clsx from 'clsx';

import { usePointerSlider } from '#hooks/usePointerSlider';
import { sprinkles, sx } from '#styles';
import type { typography } from '#tokens';
import type { UIComponent } from '#types';

import * as s from './Slider.css';

interface SliderProps
  extends Omit<UIComponent<'div', typeof s.slider>, 'children' | 'onChange'> {
  size?: keyof typeof typography.size;
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      min,
      max,
      defaultValue,
      onChange,
      className,
      color = 'primary',
      size = 'md',
      sx: propSx,
      ...props
    },
    ref,
  ) => {
    const thumbRef = useRef<HTMLSpanElement>(null);
    const value = usePointerSlider(thumbRef, {
      min,
      max,
      defaultValue,
    });
    const initRef = useRef<boolean>(false);

    useEffect(() => {
      if (!initRef.current) {
        initRef.current = true;
        return;
      }

      onChange(value);
      // eslint-disable-next-line
    }, [value]);

    return (
      <div
        ref={ref}
        className={clsx(
          s.slider({ color }),
          sprinkles({ fontSize: size }),
          className,
          sx(propSx),
        )}
        {...props}
      >
        <div className={s.bar}>
          <div
            className={s.fill}
            style={{
              right: `${(1 - (value - min) / (max - min)) * 100}%`,
            }}
          />
        </div>
        <span ref={thumbRef} className={s.thumb} />
      </div>
    );
  },
);
Slider.displayName = 'Slider';
