var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var helpers = require('./helpers');

module.exports = {
 entry: {
  vendor: './src/vendor.ts',
  app: './src/main.ts'
 },

 resolve: {
  extensions: ['.ts', '.js']
 },

 module: {
  rules: [{
    test: /\.ts$/,
    loaders: [
     'babel-loader',
     {
      loader: 'awesome-typescript-loader',
      options: {
       configFileName: helpers.root('tsconfig.json')
      }
     },
     'angular2-template-loader'
    ],
    exclude: [/node_modules/]
   },
   {
    // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
    // Removing this will cause deprecation warnings to appear.
    test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
    parser: {
     system: true
    },
   },
   {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
     presets: ['es2015']
    }
   },
   {
    test: /\.html$/,
    loader: 'html-loader'
   },
   {
    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
    loader: 'file-loader?name=assets/[name].[hash].[ext]'
   },
   {
    test: /\.css$/,
    exclude: helpers.root('src', 'app'),
    use: [
     MiniCssExtractPlugin.loader,
     'css-loader'
    ]
   },
   {
    test: /\.css$/,
    exclude: helpers.root('src', 'app'),
    loader: 'raw-loader'
   },
   {
    test: /\.scss$/,
    include: helpers.root('src', 'app'),
    use: ['raw-loader', 'sass-loader']
   }
  ]
 },

 plugins: [
  new webpack.ContextReplacementPlugin(
   /angular(\\|\/)core/,
   helpers.root('./src'), 
   {} 
  ),
  new HtmlWebpackPlugin({
   template: 'src/index.html'
  })
 ]
};