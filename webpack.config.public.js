const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const UglifyJS = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
  },

  resolve: {
    extensions: ['.js', '.scss', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production',
              },
            }, {
              loader: 'sass-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ],
        }),
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
          },
          hotReload: true,
        },
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[hash].[ext]',
        },
      },
    ],
  },

  plugins: [
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          process.env.NODE_ENV === 'production' ? 'production' : 'development'
        ),
      },
    }),
  ],
};
