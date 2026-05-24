import { theme } from '#themes';
import { recipeWithComponents } from '#utils';

export const container = recipeWithComponents({
  base: {
    position: 'relative',

    overflow: 'hidden',

    height: '100%',

    padding: '0 0.75em',

    border: '0',

    backgroundColor: 'transparent',

    fontSize: '1em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    cursor: 'pointer',

    transition: 'border-bottom-color 0.15s ease, color 0.15s ease',
  },

  variants: {
    isSelected: {
      true: {
        color: `rgb(${theme.color.foreground})`,
      },
      false: {
        color: `rgb(${theme.color['muted-foreground']})`,
      },
    },
  },
});
