const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/devServer');
const sourceMap = require('./webpack/sourceMap');
const typescript = require('./webpack/typescript');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

const common = merge([
  {
    entry: {
      'slider': PATHS.source + '/slider.ts'
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: PATHS.source + '/index.html'
      })
    ]
  },
  typescript()
]);

module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      devServer(),
      sourceMap()
    ])
  }
}
