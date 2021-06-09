/* eslint import/no-extraneous-dependencies: 0 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  watch: true,
  devtool: 'eval-cheap-source-map',
  mode: 'development',
  entry: ['./src/js/L.PM.js'],
  output: {
    filename: 'leaflet-geoman.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'leaflet-geoman.css' }),
    new CopyPlugin({
      patterns: [{ from: 'leaflet-geoman.d.ts', to: 'leaflet-geoman.d.ts' }],
    }),
  ],
};
