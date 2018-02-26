const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const manifest = require('./dist-dll/vendor-manifest.json');
const publicConfig = require('./webpack.config.public');

module.exports = {
  entry: publicConfig.entry,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '//mss.sankuai.com/v1/mss_c4375b35f5cb4e678b5b55a48c40cf9d/waimai-mfe-crm-client-h5/',
  },

  resolve: publicConfig.resolve,

  module: publicConfig.module,

  plugins: [
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
  ].concat(publicConfig.plugins).concat([
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
  ]),
};

