// tsup.config.js
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.[jt]s', 'src/**/*.[jt]sx'],
  format: ['esm', 'cjs'], // dual publish 시 권장 [web:9]
  dts: true,
  sourcemap: true,
  bundle: false,
  clean: true,
  esbuildPlugins: [esbuildPluginFilePathExtensions()],
});
