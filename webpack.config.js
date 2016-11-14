/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var libraryName = 'highlighter';
var outputFile = 'hibou-highlighter';
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var plugins = [];

if (process.env.WEBPACK_ENV === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile += '.min.js';
} else {
  outputFile += '.js';
}

module.exports = {
  entry: __dirname + '/src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: '../hibou-ch-extension/lib',
    // path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loaded bottom to top
        loaders: ['babel-loader'/*, 'eslint-loader'*/]
      }
    ]
  },
  plugins: plugins
}
