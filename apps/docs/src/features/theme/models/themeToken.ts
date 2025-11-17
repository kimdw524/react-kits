import { CSSProperties } from 'react';

import { theme } from '@kimdw-rtk/ui';

export const themeTokenKeys = [
  'background',
  'foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'border',
  'border.weak',
  'card',
  'card-foreground',
  'card.gradient',
  'success',
  'success-foreground',
  'danger',
  'danger-foreground',
  'warning',
  'warning-foreground',
] as const;

export type ThemeToken = Record<(typeof themeTokenKeys)[number], string>;

export const ThemeToken = {
  // ThemeToken 값 외의 key 값이 object에 존재할 경우 제거하여 리턴한다.
  filterObject(object: Record<string, unknown>) {
    const result = {} as ThemeToken;

    for (const key of themeTokenKeys) {
      if (typeof object[key] === 'string') {
        result[key] = object[key];
      }
    }

    return result;
  },

  // ThemeToken의 css inline style을 생성한다.
  generateInlineStyle(themeToken: ThemeToken): CSSProperties {
    const inlineVars: Record<string, string> = {};

    for (const key in themeToken) {
      const strippedKey = theme.color[key as keyof ThemeToken]
        .split('var(')![1]
        .split(')')![0];
      inlineVars[strippedKey] = themeToken[key as keyof ThemeToken];
    }
    return inlineVars;
  },
};
