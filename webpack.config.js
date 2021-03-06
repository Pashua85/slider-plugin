const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/devServer');
const sourceMap = require('./webpack/sourceMap');
const typescript = require('./webpack/typescript');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

const common = merge([
  {
    entry: {
      'slider': PATHS.source + '/slider/slider.ts',
      'index': PATHS.source + '/index.ts'
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index'],
        template: PATHS.source + '/index.pug'
      })
    ]
  },
  pug(),
  typescript()
]);

module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common,
      extractCSS()
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      devServer(),
      sass(),
      css(),
      sourceMap()
    ])
  }
}
