const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const PAGE = ['About', 'Experience', 'Contact'];
const entry = _.map(PAGE, page => './src/js/' + page + '/' + page + '.js');


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: entry,
    output: {
        filename: 'bundle.js',
        pathinfo: false,
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                      loader: 'style-loader', // inject CSS to page
                    }, {
                      loader: 'css-loader', // translates CSS into CommonJS modules
                    }, 
                    // {
                    //   loader: 'postcss-loader', // Run post css actions
                    //   options: {
                    //     plugins: function () { // post css plugins, can be exported to postcss.config.js
                    //       return [
                    //         require('precss'),
                    //         require('autoprefixer')
                    //       ];
                    //     }
                    //   }
                    // }, 
                    {
                      loader: 'sass-loader' // compiles Sass to CSS
                    }],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
    ],
}