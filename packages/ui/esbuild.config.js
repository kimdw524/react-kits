import { build } from 'esbuild';

await build({
  entryPoints: ['src/**/*'],
  bundle: true,
  splitting: true,
  format: 'esm',
  sourcemap: true,
  outdir: 'dist',
  outExtension: { '.js': '.mjs' },
  target: 'esnext',
  platform: 'node',
  tsconfig: 'tsconfig.json',
});
