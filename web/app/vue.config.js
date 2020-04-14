const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: isProd ? '/static/assets/dist' : 'http://localhost:3000/static/dist/',
    outputDir: '../static/assets/dist',
    runtimeCompiler: true,
    configureWebpack: config => {
        config.plugins.push(new BundleTracker({
            filename: './webpack-stats.json',
        }));
        if (!isProd) {
            config.devServer = {
                port: 3000,
                hot: false,
                quiet: true,
                stats: { colors: true },
                historyApiFallback: true,
                disableHostCheck: true,
                headers: { 'Access-Control-Allow-Origin': '*' },
            };
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('~', path.resolve(__dirname, 'src/'))
            .set('theme', path.resolve(__dirname, 'src/theme/index.less'));
    },
};
