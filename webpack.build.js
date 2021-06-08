/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: false,
  // devtool: 'cheap-source-map',
  entry: ['./src/js/L.PM.js'],
  mode: 'production',
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ie8: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
