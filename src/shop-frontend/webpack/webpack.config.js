/**
 * Created by roman_b on 12/8/2016.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = process.env.ENV === 'prod' ? require('../src/config/prod.json') : require('../src/config/dev.json');

module.exports = {
    entry: {main: ['./src/index.js']},
    output: {
        path: "./build",
        filename: 'books-shop.bundle.js',
        publicPath : '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015","stage-2", "react"]
                }
            },
            {
              test:/\.(png|jpg|svg)$/,
              loader: 'file-loader?name=./img/[hash].[ext]&publicPath=../../'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", ["css-loader?importLoaders=1", "postcss-loader"])
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", ["css-loader?importLoaders=1!", "postcss-loader", "less-loader"])
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./fonts/[hash].[ext]&publicPath=../../'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./styles/bundle.css"),
        new HtmlWebpackPlugin({
            title: 'Books Shelf',
            template: './public/index.html',
            filename: './index.html'
        })
    ],
    externals: {
        'Config':  JSON.stringify(config)
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    debug: true,
    target: 'web'
};