const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: {
        main: [
            "./assets/icons/icons.font",
            "./assets/index.less",
            "./assets/index.js"
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new BundleTracker({ filename: './webpack-stats.json' })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            // CSS/LESS and svg->fonts rules separated for prod and dev
            {
                test: /\.pug$/, 
                loader: "pug-loader",
                options: {
                    pretty: true,
                    resolve: {
                        alias: {
                            templates: path.resolve(__dirname, "../templates"),
                        }
                    }
                }
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "assets/images/[name].[ext]",
                            limit: 1000
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/video/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: [ {
                    loader: "file-loader",
                    options: {
                        name: "assets/fonts/[name].[ext]"
                    }
                }]
            }
        ]
    }
};