const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

const PAGE = ['Home'];
const entry = _.map(PAGE, page => './src/js/' + page + '/' + page + '.js');


module.exports = {
    mode: 'production',
    entry: entry,
    output: {
        filename: 'bundle.js',
        pathinfo: false,
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images',
                        esModule: false,
                    }
                }
            },
        ]
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             exclude: /(node_modules|bower_components|dist)/,
    //             test: /\.js(\?.*)?$/i,
    //         })
    //     ],
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        }),
        new HtmlWebpackPlugin({ template: "./src/index.html", filename: "./index.html" }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),

    ],
}