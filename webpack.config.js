'use strict';

var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var paths = [];
paths = paths.concat(require('node-neat').includePaths);
paths = paths.concat(require('node-bourbon').includePaths);
paths.map((path) => fs.realpathSync(path));

const appDir = fs.realpathSync(path.resolve(__dirname, 'app'));

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './app/index.js'
    ],
    output: {
        path: fs.realpathSync(path.join(__dirname, 'static')),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    resolveLoader: {
        root: fs.realpathSync(path.join(__dirname, 'node_modules'))
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot'],
            include: [appDir]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [appDir]
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: [appDir]
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: [appDir]
        }]
    },
    sassLoader: {
        includePaths: paths
    }
};
