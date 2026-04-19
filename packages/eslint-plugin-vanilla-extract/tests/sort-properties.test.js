import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';

import sortPropertiesRule from '../rules/sort-properties.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    parser: tseslint.parser,
    sourceType: 'module',
  },
});

ruleTester.run('sort-properties', sortPropertiesRule, {
  valid: [
    {
      code: `
        import { style } from '@vanilla-extract/css';

        export const box = style({
          position: 'relative',

          display: 'flex',

          alignItems: 'center',
          gap: '0.5rem',

          width: '100%',

          padding: '1rem',

          borderRadius: '1rem',

          backgroundColor: 'white',
          color: 'black',

          cursor: 'pointer',

          transition: 'transform 0.2s ease',

          ':hover': {
            opacity: 0.8,
          },

          '@media': {
            'screen and (min-width: 768px)': {
              padding: '2rem',
            },
          },
        });
      `,
    },
    {
      code: `
        import { recipe } from '@vanilla-extract/recipes';

        export const button = recipe({
          variants: {
            size: {
              md: {
                display: 'inline-flex',

                alignItems: 'center',

                padding: '0 1rem',

                fontSize: '1rem',
              },
            },
          },
        });
      `,
    },
    {
      code: `
        import { style } from '@vanilla-extract/css';

        export const overlay = style({
          inset: '0',
          position: 'fixed',
          zIndex: '10',

          display: 'flex',

          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: 'black',

          opacity: 0,
        });
      `,
    },
  ],
  invalid: [
    {
      code: `
        import { style } from '@vanilla-extract/css';

        export const box = style({
          color: 'black',
          display: 'flex',
          top: '0',
          padding: '1rem',
          position: 'absolute',
          ':hover': {
            color: 'red',
            opacity: 0.8,
          },
          transition: 'opacity 0.2s ease',
          backgroundColor: 'white',
        });
      `,
      errors: [{ messageId: 'expectedOrder' }, { messageId: 'expectedOrder' }],
      output: `
        import { style } from '@vanilla-extract/css';

        export const box = style({
          position: 'absolute',
          top: '0',

          display: 'flex',

          padding: '1rem',

          backgroundColor: 'white',
          color: 'black',

          transition: 'opacity 0.2s ease',

          ':hover': {
            color: 'red',
            opacity: 0.8,
          },
        });
      `,
    },
    {
      code: `
        import { globalStyle } from '@vanilla-extract/css';

        globalStyle('body', {
          color: 'black',
          margin: '0',
          backgroundColor: 'white',
        });
      `,
      errors: [{ messageId: 'expectedOrder' }],
      output: `
        import { globalStyle } from '@vanilla-extract/css';

        globalStyle('body', {
          margin: '0',

          backgroundColor: 'white',
          color: 'black',
        });
      `,
    },
    {
      code: `
        import { style } from '@vanilla-extract/css';

        export const overlay = style({
          inset: '0',
          position: 'fixed',
          zIndex: '10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          opacity: 0,
        });
      `,
      errors: [{ messageId: 'expectedOrder' }],
      output: `
        import { style } from '@vanilla-extract/css';

        export const overlay = style({
          inset: '0',
          position: 'fixed',
          zIndex: '10',

          display: 'flex',

          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: 'black',

          opacity: 0,
        });
      `,
    },
    {
      code: `
        import { recipe } from '@vanilla-extract/recipes';

        export const button = recipe({
          base: {
            color: 'black',
            display: 'inline-flex',
            position: 'relative',
          },
          variants: {
            tone: {
              primary: {
                color: 'white',
                padding: '1rem',
                backgroundColor: 'blue',
              },
            },
          },
        });
      `,
      errors: [{ messageId: 'expectedOrder' }, { messageId: 'expectedOrder' }],
      output: `
        import { recipe } from '@vanilla-extract/recipes';

        export const button = recipe({
          base: {
            position: 'relative',

            display: 'inline-flex',

            color: 'black',
          },
          variants: {
            tone: {
              primary: {
                padding: '1rem',

                backgroundColor: 'blue',
                color: 'white',
              },
            },
          },
        });
      `,
    },
    {
      code: `
        import { keyframes } from '@vanilla-extract/css';

        export const fadeIn = keyframes({
          '0%': {
            transform: 'scale(0.95)',
            opacity: 0,
          },
        });
      `,
      errors: [{ messageId: 'expectedOrder' }],
      output: `
        import { keyframes } from '@vanilla-extract/css';

        export const fadeIn = keyframes({
          '0%': {
            opacity: 0,

            transform: 'scale(0.95)',
          },
        });
      `,
    },
  ],
});
