/**
 * Created by roman_b on 12/8/2016.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

process.env.BROWSER = true;

module.exports = {
    entry: {main: ['./src/index.js']},
    output: {
        path: "./build",
        filename: 'books-shop.bundle.js',
        publicPath : '/'
    },
    module: {
        rules: [
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
                use: ExtractTextPlugin.extract({fallback: 'style-loader',
                    use: [{loader : "css-loader"}]})
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader",
                    use: [{loader : "css-loader"}, {loader : "less-loader"}]})
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./fonts/[hash].[ext]&publicPath=../../'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: "./styles/bundle.css"}),
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true)
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })

    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    target: 'web'
};

/*
*  new HtmlWebpackPlugin({
 title: 'Books Shelf',
 template: './public/index.html',
 filename: './index.html'
 }),*/