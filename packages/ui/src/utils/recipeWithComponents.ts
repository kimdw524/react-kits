import { recipe, type RuntimeFn } from '@vanilla-extract/recipes';

import { styleWithComponents } from './styleWithComponents';

type RecipeStyleRule = Parameters<typeof styleWithComponents>[0] | string;
type VariantDefinitions = Record<string, RecipeStyleRule>;
type VariantGroups = Record<string, VariantDefinitions>;
type BooleanMap<T> = T extends 'true' | 'false' ? boolean : T;
type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]?:
    | BooleanMap<keyof Variants[VariantGroup]>
    | undefined;
};
type CompoundVariant<Variants extends VariantGroups> = {
  variants: VariantSelection<Variants>;
  style: RecipeStyleRule;
};
type PatternOptions<Variants extends VariantGroups> = {
  base?: RecipeStyleRule;
  variants?: Variants;
  defaultVariants?: VariantSelection<Variants>;
  compoundVariants?: Array<CompoundVariant<Variants>>;
};

const withComponentsRule = (rule: RecipeStyleRule) =>
  typeof rule === 'string' ? rule : styleWithComponents(rule);

export const recipeWithComponents = <Variants extends VariantGroups>(
  options: PatternOptions<Variants>,
  debugId?: string,
): RuntimeFn<Variants> =>
  recipe(
    {
      ...options,
      base: options.base && withComponentsRule(options.base),
      variants:
        options.variants &&
        (Object.entries(options.variants).reduce(
          (prev, [groupName, variants]) => ({
            ...prev,
            [groupName]: Object.entries(variants).reduce(
              (variantPrev, [variantName, rule]) => ({
                ...variantPrev,
                [variantName]: withComponentsRule(rule),
              }),
              {},
            ),
          }),
          {},
        ) as Variants),
      compoundVariants: options.compoundVariants?.map((compoundVariant) => ({
        ...compoundVariant,
        style: withComponentsRule(compoundVariant.style),
      })),
    },
    debugId,
  );
