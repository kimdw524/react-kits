import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import fs from 'fs';

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
  },
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
    unknownGlobalSideEffects: false,
  },
  external: [...peerDeps, 'react/jsx-runtime'],
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs({
      include: /node_modules/,
      defaultIsModuleExports: true,
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    vanillaExtractPlugin(),
  ],
};
