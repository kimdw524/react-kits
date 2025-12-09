import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
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
  },
  external: [...peerDeps, 'react/jsx-runtime'],
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs({
      include: /node_modules/,
      defaultIsModuleExports: true,
    }),
    preserveDirectives(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
