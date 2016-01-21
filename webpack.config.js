'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var srcPath = path.join(__dirname, 'src');
var autoprefixer = require('autoprefixer');
var debugFlagPlugin = new webpack.DefinePlugin({
  DEBUG: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  target: "web",
  cache: true,
  
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
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
        loader: 'react-hot!babel'
      },
      {
        test: /\.scss$/,
        //exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' +
            '!postcss-loader' +
            '!sass-loader?sourceMap&includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib") +
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
    debugFlagPlugin,
    new webpack.NoErrorsPlugin()
  ],
  
  debug: true,
  watch: true,
  devtool: 'eval-cheap-module-source-map',
  toolbox: {theme: path.join(srcPath, 'scss/theme.scss')},
  devServer: {
    contentBase: './tmp',
    historyApiFallback: true
  }
}