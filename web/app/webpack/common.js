const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    entry: {
        main: [
            "./assets/static/icons/icons.font",
            "./assets/index.less",
            "./assets/index.js",
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
                test: /\.(png|gif|jpg|jpeg|ico|tiff)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                            outputPath: "images2",
                            context: './assets/static/images',
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: [ {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                        outputPath: "fonts",
                        context: './assets/static/fonts',
                    }
                }]
            }
        ]
    }
};