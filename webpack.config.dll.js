const path = require('path');
const webpack = require('webpack');
const UglifyJS = require('uglifyjs-webpack-plugin');
const publicConfig = require('./webpack.config.public');

module.exports = {
  entry: {
    vendor: [path.resolve(__dirname, 'src/vendor.js')],
  },

  output: {
    path: path.resolve(__dirname, 'dist-dll'),
    filename: '[name].dll.js',
    library: '[name]',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dist-dll/[name]-manifest.json'),
      filename: '[name].dll.js',
      name: '[name]',
    }),
    new UglifyJS({
      uglifyOptions: {
        mangle: true,
        compress: {
          warnings: false,
          pure_getters: true,
        },
      },
    }),
  ],
};
