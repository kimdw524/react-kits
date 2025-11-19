import { theme } from '@kimdw-rtk/ui/theme';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('.light', {
  vars: {
    [theme.color['background']]: '255, 255, 255',
    [theme.color['foreground']]: '30, 41, 59',
    [theme.color['primary']]: '42, 122, 255',
    [theme.color['primary-foreground']]: '240, 248, 255',
    [theme.color['secondary']]: '240, 242, 245',
    [theme.color['secondary-foreground']]: '48, 48, 49',
    [theme.color['muted']]: '234, 239, 245',
    [theme.color['muted-foreground']]: '120, 120, 120',
    [theme.color['accent']]: '224, 228, 233',
    [theme.color['accent-foreground']]: '73, 87, 111',
    [theme.color['border']]: '228, 228, 231',
    [theme.color['border.weak']]: '220, 229, 237',
    [theme.color['card']]: '248, 250, 252',
    [theme.color['card-foreground']]: '10, 10, 11',
    [theme.color['card.gradient']]: '179, 195, 255',
    [theme.color['success']]: '34, 197, 94',
    [theme.color['success-foreground']]: '255, 255, 255',
    [theme.color['danger']]: '239, 68, 68',
    [theme.color['danger-foreground']]: '255, 255, 255',
    [theme.color['warning']]: '251, 191, 36',
    [theme.color['warning-foreground']]: '49, 36, 0',
  },
});

globalStyle('.dark', {
  vars: {
    [theme.color['background']]: '12, 12, 14',
    [theme.color['foreground']]: '238, 238, 238',
    [theme.color['primary']]: '36, 81, 173',
    [theme.color['primary-foreground']]: '238, 238, 238',
    [theme.color['secondary']]: '32, 38, 45',
    [theme.color['secondary-foreground']]: '212, 212, 213',
    [theme.color['muted']]: '30, 36, 44',
    [theme.color['muted-foreground']]: '102, 112, 133',
    [theme.color['accent']]: '41, 52, 67',
    [theme.color['accent-foreground']]: '186, 212, 255',
    [theme.color['border']]: '38, 43, 51',
    [theme.color['border.weak']]: '32, 32, 32',
    [theme.color['card']]: '23, 23, 25',
    [theme.color['card-foreground']]: '238, 238, 238',
    [theme.color['card.gradient']]: '255, 255, 255',
    [theme.color['success']]: '22, 163, 74',
    [theme.color['success-foreground']]: '255, 255, 255',
    [theme.color['danger']]: '220, 38, 38',
    [theme.color['danger-foreground']]: '255, 255, 255',
    [theme.color['warning']]: '202, 138, 4',
    [theme.color['warning-foreground']]: '30, 23, 0',
  },
});
