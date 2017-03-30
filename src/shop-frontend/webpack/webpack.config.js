/**
 * Created by roman_b on 12/8/2016.
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');

process.env.BROWSER = true;

module.exports = {
    entry: {main: ['./src/index.js']},
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: 'books-shop.bundle.js',
        publicPath : '/'
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
        new ExtractTextPlugin({filename: "./styles/bundle.css"}),
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true)
        })

    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    target: 'web'
};
