import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import graphql from '@rollup/plugin-graphql';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm',
      exports: 'named',
      preserveModules: true,
      plugins: [terser()],
    },
  ],
  plugins: [
    filesize(),
    peerDepsExternal(),
    resolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    commonjs(),
    graphql(),
    typescript({
      clean: true,
      useTsconfigDeclarationDir: true,
    }),
  ],
};
