// tsup.config.js
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.[jt]s', 'src/**/*.[jt]sx'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  bundle: false,
  splitting: true,
  clean: true,
  esbuildPlugins: [esbuildPluginFilePathExtensions()],
  outExtension({ format }) {
    return format === 'esm' ? { js: '.mjs' } : { js: '.cjs' };
  },
});
