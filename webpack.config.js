const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');
const publicConfig = require('./webpack.config.public');

module.exports = {
  entry: publicConfig.entry,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: process.env.LOCAL_ADDRESS,
    port: 8888,
    inline: true,
    proxy: {
      '/agent': {
        target: 'http://develop.agent.waimai.sankuai.info',
        secure: false,
        changeOrigin: true,
      },
    },
  },

  devtool: 'cheap-module-source-map',

  resolve: publicConfig.resolve,

  module: publicConfig.module,

  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
    }),
    new HtmlWebpackPlugin({
      title: 'App',
      template: 'src/index.html',
      inject: 'body',
      chunks: ['common', 'app'],
    }),
    new OpenBrowserPlugin({
      url: `http://${process.env.LOCAL_ADDRESS}:8888`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
