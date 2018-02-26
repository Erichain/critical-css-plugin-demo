const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJS = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('./dist-dll/vendor-manifest.json');
const publicConfig = require('./webpack.config.public');

module.exports = {
  entry: publicConfig.entry,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
  },

  resolve: publicConfig.resolve,

  module: publicConfig.module,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      chunks: ['app'],
    }),
    new webpack.DllReferencePlugin({
      manifest,
    }),
    new CopyWebpackPlugin([{
      from: 'dist-dll/vendor.dll.js',
      to: './js',
    }]),
    new HtmlWebpackIncludeAssetsPlugin({
      files: ['index.html'],
      assets: ['js/vendor.dll.js'],
      append: false,
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
    new ExtractTextPlugin({
      filename: 'css/style.[hash].css',
      allChunks: true
    }),
    new HtmlCriticalPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
};

