/**
 * Created by roman_b on 1/17/2017.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');

console.log(path.resolve(__dirname, '../../../src/shop-frontend/node_modules'));

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
        modules: ['node_modules', path.resolve(__dirname, '../../../src/shop-frontend/node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015","stage-2", "react"]
                    }
                },
                exclude: /node_modules/,

            },
            {
                test:/\.(png|jpg|svg)$/,
                use: 'file-loader?name=./img/[hash].[ext]&publicPath=../../'
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
                use: 'file-loader?name=./fonts/[hash].[ext]&publicPath=../../'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./styles/bundle.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true)
        }),
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    target: 'web'
};
