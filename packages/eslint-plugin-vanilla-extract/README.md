# @repo/eslint-plugin-vanilla-extract

An ESLint plugin that groups and sorts CSS properties inside `vanilla-extract`
style objects, including wrappers whose names start with `style` or `recipe`.

## Rule

- `vanilla-extract/sort-properties`
  Sorts properties in `style(...)`, `recipe(...)`, and prefix-based wrappers
  such as `styleFactory(...)` and `recipeFactory(...)`.

## Default grouping

- metadata: `@layer`, `composes`, `vars`
- position: `position`, `top`, `right`, `bottom`, `left`, `zIndex`
- layout: `display`, `overflow`, `visibility`
- flex and grid: `alignItems`, `justifyContent`, `gap`, and related properties
- size: `width`, `height`, `minWidth`, `maxHeight`, and related properties
- spacing: `margin` and `padding` families
- border: `border`, `borderRadius`, `outline`, and related properties
- background and color: `backgroundColor`, `color`, `fill`, `stroke`
- typography: `fontSize`, `lineHeight`, `textAlign`, and related properties
- effects: `opacity`, `boxShadow`, `filter`
- interaction: `cursor`, `pointerEvents`, `userSelect`
- animation: `transform`, `transition`, `animation`
- trailing groups: pseudo selectors, `selectors`, `@media`, `@supports`,
  `@container`

## Usage

```js
import vanillaExtractPlugin from '@repo/eslint-plugin-vanilla-extract';

export default [...vanillaExtractPlugin.configs.recommended];
```
