'use strict';

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

let paths = [];
paths = paths.concat(require('node-neat').includePaths);
paths = paths.concat(require('node-bourbon').includePaths);
paths.map(item => fs.realpathSync(item));

const appDir = fs.realpathSync(path.resolve(__dirname, 'app'));

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
