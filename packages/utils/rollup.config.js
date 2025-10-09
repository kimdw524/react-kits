import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: './src',
    entryFileNames: '[name].js',
  },
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),

    commonjs({
      include: /node_modules/,
      defaultIsModuleExports: true,
    }),

    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
