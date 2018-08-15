var webpackMerge = require('webpack-merge');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
 mode: 'development',
 devtool: 'cheap-module-eval-source-map',

 output: {
  path: helpers.root('dist'),
  publicPath: '/',
  filename: '[name].js',
  chunkFilename: '[id].chunk.js'
 },

 plugins: [
  new MiniCssExtractPlugin({
   filename: "[name].css"
  }),
  new webpack.NamedModulesPlugin()
 ],

 devServer: {
  historyApiFallback: true,
  stats: 'minimal'
 }
});