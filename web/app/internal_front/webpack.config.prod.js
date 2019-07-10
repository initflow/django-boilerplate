const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    output: {
        path: path.resolve("../static/assets/dist"),
        filename: "[name]-[hash].js"
    },
    mode: 'production',
    optimization: {
        minimizer: [ 
            new TerserJSPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                },
            }), 
            new OptimizeCSSAssetsPlugin({}) 
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [ require('autoprefixer') ],
                        }
                    },
                    {
                        loader: "less-loader", 
                        options: {
                            paths: [
                                path.resolve(__dirname, "../assets"),
                                path.resolve(__dirname, "../templates")
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.font\.(js|json)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'replace-loader',
                        options: {
                            flags: 'g',
                            regex: '\/assets\/',
                            sub: '\.\/assets\/'
                        }
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "webfonts-loader",
                        options: { fileName: './assets/[fontname]-[hash].[ext]' }
                    }
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
        }),
        // new TerserJSPlugin({
        //     // test: /\.js$/,
        //     // test: /\.js/,
        //     include: /\.\/assets/,
        // }), 

    ]
});