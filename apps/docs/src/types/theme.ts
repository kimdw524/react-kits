export type ThemeColor = {
  background: string;
  foreground: string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  border: string;
  'border.weak': string;
  card: string;
  'card-foreground': string;
  'card.gradient': string;
  success: string;
  'success-foreground': string;
  danger: string;
  'danger-foreground': string;
  warning: string;
  'warning-foreground': string;
};

export type ThemeVars = {
  light: ThemeColor;
  dark: ThemeColor;
};
