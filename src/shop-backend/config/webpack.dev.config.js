/**
 * Created by roman_b on 1/17/2017.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

const SOURCE_FOLDER = "../../shop-frontend/src";

var config = process.env.ENV === 'prod' ?
    require(SOURCE_FOLDER + '/config/prod.json') :
    require(SOURCE_FOLDER + '/config/dev.json');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './src/shop-frontend/src/index.js'
    ],
    output: {
        path : path.resolve(__dirname, './'),
        filename: 'books-shop.bundle.js',
        publicPath : '/'
    },
    resolve: {
        modulesDirectories: ['node_modules', './src/shop-frontend/node_modules']
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
                loader: 'file-loader?context=./img/[hash].[ext]&publicPath=../../'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", ["css-loader?importLoaders=1", "postcss-loader"])
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", ["css-loader?importLoaders=1!", "postcss-loader", "less-loader"])
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
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
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Books Shelf',
            template: './src/shop-frontend/public/index.html',
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
