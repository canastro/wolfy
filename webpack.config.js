'use strict';

var path = require('path');
var webpack = require('webpack');

var paths = [];
paths = paths.concat(require('node-neat').includePaths);
paths = paths.concat(require('node-bourbon').includePaths);
paths = paths.concat(path.join(__dirname, 'node_modules', 'aviago-core-components', 'assets', 'sass'));
paths = paths.concat(path.join(__dirname, 'node_modules', 'quill', 'dist'));

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './app/index.js'
    ],
    output: {
        path: path.join(__dirname, 'static'),
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
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot'],
            include: [
                path.resolve(__dirname, 'app')
            ]
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'node_modules', 'aviago-core-components', 'app'),
                path.resolve(__dirname, 'app')
            ]
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            include: [
                path.resolve(__dirname, 'app')
            ]
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    sassLoader: {
        includePaths: paths
    }
};
