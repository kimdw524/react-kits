import vanillaExtractPlugin from '@kimdw-rtk/eslint-plugin-vanilla-extract';

import { config as reactInternalConfig } from './react-internal.js';

export const config = [
  ...reactInternalConfig,
  ...vanillaExtractPlugin.configs.recommended,
];
