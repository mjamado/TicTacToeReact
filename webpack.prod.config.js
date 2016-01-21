'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var srcPath = path.join(__dirname, 'src');
var autoprefixer = require('autoprefixer');

module.exports = {
  target: "web",
  cache: true,
  
  entry: {
    main: [
      path.join(srcPath, 'index.jsx')
    ],
    common: ['react', 'react-router', 'redux'],
  },
  
  resolve: {
    root: srcPath,
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ['node_modules', 'src']
  },
  
  output: {
    path: path.join(__dirname, 'tmp'),
    publicPath: '',
    filename: '[name].js',
    library: '[name]',
    pathInfo: true
  },
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' +
            '!postcss-loader' +
            '!sass-loader?includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib") +
            '!toolbox'
        )
      }
    ]
  },
  
  postcss: [autoprefixer],
  
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ],
  
  toolbox: {theme: path.join(srcPath, 'scss/theme.scss')}
}