'use strict';

var webpack = require('webpack');
var path = require('path');

var paths = [];
paths = paths.concat(require('node-neat').includePaths);
paths = paths.concat(require('node-bourbon').includePaths);
paths = paths.concat(path.join(__dirname, 'node_modules', 'aviago-core-components', 'assets', 'sass'));
paths = paths.concat(path.join(__dirname, 'node_modules', 'react-select', 'scss'));
paths = paths.concat(path.join(__dirname, 'node_modules', 'quill', 'dist'));

module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.TARGET_ENV': JSON.stringify(process.env.TARGET_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true)
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
