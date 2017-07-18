/* eslint import/no-extraneous-dependencies: 0 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    watch: true,
    devtool: 'cheap-eval-source-map',
    entry: ['./src/js/L.PM.js'],
    output: {
        filename: 'leaflet.pm.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('leaflet.pm.css'),
    ],
};
