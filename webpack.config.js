'use strict';
const path = require('path');
const webpack = require('webpack')
module.exports = {
    entry: {
        app: './vendor/core.ts'
    },
    context: path.resolve(__dirname, './src'),
    output: {
        path: path.resolve(__dirname, './app'),
        filename: '[name].min.ts'
    },
    module: {
        loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    devtool: 'source-map',
    plugins: [
    ]
};
