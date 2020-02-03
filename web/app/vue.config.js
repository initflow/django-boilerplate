const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/static/assets/dist' : 'http://localhost:3000/static/assets/dist/',
    outputDir: '../static/assets/dist',
    runtimeCompiler: true,
    configureWebpack: config => {
        config.plugins.push(new BundleTracker({
            filename: './webpack-stats.json',
        }));
        config.devServer = {
            port: 3000,
            hot: false,
            quiet: true,
            stats: { colors: true },
            historyApiFallback: true,
            disableHostCheck: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
        };
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('~', path.resolve(__dirname, 'src/'))
            .set('theme', path.resolve(__dirname, 'src/theme/index.less'));
    },
};
