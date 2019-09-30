const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  entry: './src/main.js',
   plugins: [
     new HtmlWebpackPlugin({
       template:'./public/index.html',
     }),
     new CleanWebpackPlugin(),
     new VueLoaderPlugin(),
   ],
   devServer: {
     contentBase: './dist',
     port: 8083
   },
   output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
   module: {
       rules: [
           {
               test: /\.css$/,
               use: [
                   'style-loader',
                   'css-loader'
               ]
           },
           {
               test: /\.(jpg|png|svg|gif)$/,
               use: [
                   'file-loader'
               ]
           },
           {
               test: /\.(woff|woff2|eot|ttf|otf)$/,
               use: [
                   'file-loader'
               ]
           },
           {
               test: /\.js$/,
               use: [
                   'babel-loader'
               ],
               exclude: /node_modules/
           },
           {
               test: /\.vue$/,
               use: [
                   'vue-loader'
               ],
           },
           {
               test:/\.scss$/,
               use:[
                   'style-loader',
                   'css-loader',
                   'sass-loader'
               ]
           },
       ]
   },
};