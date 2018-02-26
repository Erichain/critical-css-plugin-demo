const path = require('path');
const webpack = require('webpack');
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
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dist-dll/[name]-manifest.json'),
      filename: '[name].dll.js',
      name: '[name]',
    }),
  ].concat(publicConfig.plugins),
};
