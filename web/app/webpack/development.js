const merge = require('webpack-merge');
const common = require('./common.js');
const path = require('path');
const port = 9000;

module.exports = merge(common, {
    output: {
        path: path.resolve("./static/bundles/"),
        filename: '[name]-[hash].js',
        publicPath: "http://localhost:" + port + "/static/bundles/"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader", 
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer'),
                            ]
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            paths: [
                                path.resolve(__dirname, "../assets"),
                                path.resolve(__dirname, "../templates")
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader", 
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.font\.(js|json)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "webfonts-loader",
                        options: { embed: true }
                    }
                ]
            },
        ],
    },
    devServer: {
        contentBase: path.resolve("./static/bundles/"),
        compress: true,
        port: port,
        headers: { 'Access-Control-Allow-Origin': '*' }
    },
    devtool: 'eval-sourcemap',
});