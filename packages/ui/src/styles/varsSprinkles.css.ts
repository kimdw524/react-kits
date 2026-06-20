import { createVar, style, type StyleRule } from '@vanilla-extract/css';

import { conditions } from '#styles';
import { spacing } from '#tokens';

const withCondition = (
  condition: Record<string, string>,
  rule: StyleRule,
): StyleRule => {
  const entries = Object.entries(condition);

  if (entries.length === 0) {
    return rule;
  }

  const [atRule, query] = entries[0] as [string, string];

  return {
    [atRule]: {
      [query]: rule,
    },
  } as StyleRule;
};

const vars = {
  spacing,
};

export const sprinklesVars = {
  spacing: createVar(),
};

export type VarsSprinklesProps = Partial<{
  [T in keyof typeof vars]: Partial<
    | Record<keyof typeof conditions, keyof (typeof vars)[T]>
    | keyof (typeof vars)[T]
  >;
}>;

export const varsClasses = {} as {
  [T in keyof typeof vars]: Record<
    keyof typeof conditions,
    Record<keyof (typeof vars)[T], string>
  >;
};

Object.entries(conditions).forEach(([_name, condition]) => {
  for (const _item in vars) {
    const item = _item as keyof typeof vars,
      name = _name as keyof typeof conditions;
    const itemVar = sprinklesVars[item];

    varsClasses[item] = { ...varsClasses[item], [name]: {} };

    Object.entries(vars[item]).forEach(([_key, value]) => {
      const key = _key as keyof (typeof vars)[typeof item];

      varsClasses[item][name][key] = style({
        ...withCondition(condition, {
          vars: {
            [itemVar]: value,
          },
        }),
      });
    });
  }
});
