import {
  style,
  type ComplexStyleRule,
  type StyleRule,
} from '@vanilla-extract/css';

import { componentsLayer } from '#styles';

type ClassNames = string | Array<ClassNames>;
type ComponentsStyleRule =
  | Omit<StyleRule, '@layer'>
  | Array<Omit<StyleRule, '@layer'> | ClassNames>;

const withComponentsLayer = (rule: ComponentsStyleRule): ComplexStyleRule => {
  if (!Array.isArray(rule)) {
    return {
      '@layer': {
        [componentsLayer]: rule,
      },
    };
  }

  return rule.map((item) => {
    if (typeof item === 'string' || Array.isArray(item)) {
      return item;
    }

    return {
      '@layer': {
        [componentsLayer]: item,
      },
    };
  });
};

export const styleWithComponents = (
  rule: ComponentsStyleRule,
  debugId?: string,
) => style(withComponentsLayer(rule), debugId);
