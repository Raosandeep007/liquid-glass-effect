import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'LiquidGlass',
      sourcemap: true
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'LiquidGlass',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    postcss({
      extract: false,
      inject: false,
      minimize: true
    })
  ]
};
