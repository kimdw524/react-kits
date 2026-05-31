import { theme } from '@kimdw-rtk/ui/theme';
import { darkColor, lightColor } from '@kimdw-rtk/ui/token';

import type { ThemeToken } from './themeToken';

export interface ThemeVars {
  borderRadius: string;
  light: ThemeToken;
  dark: ThemeToken;
}

const scaleColors = {
  light: lightColor,
  dark: darkColor,
};

const getCssVariable = (variable: string) => {
  return variable.slice(4, -1);
};

export const ThemeVars = {
  generateVanillaExtractCode(themeVars: ThemeVars): string[] {
    const lines: string[] = [];

    const generateGlobalStyle = (theme: 'light' | 'dark') => {
      lines.push(`globalStyle('.${theme}', {`);
      lines.push(`\tvars: {`);
      lines.push(`\t\t[theme.borderRadius]: '${themeVars.borderRadius}',`);
      Object.entries(themeVars[theme]).forEach(([key, value]) => {
        lines.push(`\t\t[theme.color['${key}']]: '${value}',`);
      });
      Object.entries(scaleColors[theme]).forEach(([color, scales]) => {
        Object.entries(scales).forEach(([scale, value]) => {
          lines.push(`\t\t[theme.color['${color}']['${scale}']]: '${value}',`);
        });
      });
      if (lines.length > 0) {
        lines[lines.length - 1] = lines.at(-1)!.slice(0, -1);
      }
      lines.push(`\t}`);
      lines.push(`});`);
    };

    lines.push(`import { theme } from '@kimdw-rtk/ui/theme';`);
    lines.push(`import { globalStyle } from '@vanilla-extract/css';\n\n`);

    generateGlobalStyle('light');
    lines.push('\n');
    generateGlobalStyle('dark');

    return lines;
  },

  generateCssCode(themeVars: ThemeVars): string[] {
    const lines: string[] = [];

    const generateCss = (themeName: 'light' | 'dark') => {
      lines.push(`.${themeName} {`);
      lines.push(
        `\t${getCssVariable(theme.borderRadius)}: ${themeVars.borderRadius};`,
      );
      Object.entries(themeVars[themeName]).forEach(([key, value]) => {
        lines.push(
          `\t${getCssVariable(theme.color[key as keyof ThemeToken])}: ${value};`,
        );
      });
      Object.entries(scaleColors[themeName]).forEach(([color, scales]) => {
        const variables = theme.color[color as keyof typeof lightColor];

        Object.entries(scales).forEach(([scale, value]) => {
          lines.push(
            `\t${getCssVariable(variables[scale as unknown as keyof typeof variables])}: ${value};`,
          );
        });
      });
      lines.push(`}`);
    };

    generateCss('light');
    lines.push('\n');
    generateCss('dark');

    return lines;
  },
};
