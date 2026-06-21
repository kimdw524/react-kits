import { varsClasses, type VarsSprinklesProps } from '#styles';

type VarName = keyof typeof varsClasses;
type ConditionName = keyof (typeof varsClasses)[VarName];
type VarValue = keyof (typeof varsClasses)[VarName][ConditionName];

export const varsSprinkles = (props: VarsSprinklesProps) => {
  const classNames: string[] = [];

  for (const item of Object.keys(props) as VarName[]) {
    const conditions = props[item];

    if (conditions === undefined) {
      continue;
    }

    if (typeof conditions === 'string') {
      const value = props[item] as VarValue;
      classNames.push(varsClasses[item]['mobile'][value]);
      continue;
    }

    for (const condition of Object.keys(conditions) as ConditionName[]) {
      const value = conditions[condition] as VarValue;

      classNames.push(varsClasses[item][condition][value]);
    }
  }

  return classNames.join(' ');
};
