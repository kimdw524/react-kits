import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import fs from 'fs';
import postcss from 'rollup-plugin-postcss';
import preserveDirectives from 'rollup-plugin-preserve-directives';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const peerDeps = pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [];
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: './src',
    entryFileNames: '[name].js',
    assetFileNames({ name }) {
      return name?.replace(/^src\//, '') ?? '';
    },
  },
  treeshake: {
    moduleSideEffects: (id) => /\.css$/.test(id),
  },
  external: [...peerDeps, 'react/jsx-runtime'],
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs({
      include: /node_modules/,
      defaultIsModuleExports: true,
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    preserveDirectives(),
    postcss({
      extract: true,
    }),
    vanillaExtractPlugin(),
  ],
};
