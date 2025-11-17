import { ThemeToken } from './themeToken';

export interface ThemeVars {
  light: ThemeToken;
  dark: ThemeToken;
}

export const ThemeVars = {
  generateCode(themeVars: ThemeVars): string[] {
    const lines: string[] = [];

    const generateGlobalStyle = (theme: 'light' | 'dark') => {
      lines.push(`globalStyle('.${theme}', {`);
      lines.push(`\tvars: {`);
      Object.entries(themeVars[theme]).forEach(([key, value]) => {
        lines.push(`\t\t[theme.color['${key}']]: '${value}',`);
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
};
