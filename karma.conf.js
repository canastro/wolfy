var webpack = require('webpack');
var path = require('path');

var paths = [];
paths = paths.concat(require('node-neat').includePaths);
paths = paths.concat(require('node-bourbon').includePaths);
paths = paths.concat(path.join(__dirname, 'node_modules', 'aviago-core-components', 'assets', 'sass'));
paths = paths.concat(path.join(__dirname, 'node_modules', 'quill', 'dist'));

module.exports = function (config) {
    config.set({
        basePath: '.',

        browsers: ['PhantomJS'],

        singleRun: !!process.env.CI,

        frameworks: ['mocha'],

        files: [
            './webpack.test.js'
        ],

        preprocessors: {
            './webpack.test.js': ['webpack', 'sourcemap']
        },

        reporters: ['mocha', 'coverage'],

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-coverage')
        ],

        coverageReporter: {
            // specify a common output directory
            dir: 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'text-summary' },
                { type: 'lcov'}
            ]
        },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, 'app'),
                        path.resolve(__dirname, 'tests'),
                        path.resolve(__dirname, 'node_modules', 'aviago-core-components', 'app')
                    ]
                }, {
                    test: /\.scss$/,
                    loaders: ['style', 'css', 'sass']
                }, {
                    test: /\.js$/,
                    loader: 'babel-istanbul',
                    exclude: [
                        /node_modules/,
                        /tests/
                    ]
                }]
            },
            sassLoader: {
                includePaths: paths
            },
            resolve: {
                modulesDirectories: [
                    '.',
                    'src',
                    'tests',
                    'node_modules'
                ],
                extensions: ['', '.json', '.js']
            },
            externals: {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
            plugins: [
                new webpack.IgnorePlugin(/\.json$/),
                new webpack.NoErrorsPlugin(),
                new webpack.DefinePlugin({
                    __CLIENT__: true,
                    __SERVER__: false,
                    __DEVELOPMENT__: true,
                    __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
                })
            ]
        },
        webpackServer: {
            noInfo: true
        }
    });
};
