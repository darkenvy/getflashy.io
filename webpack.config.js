var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var dir_js = path.resolve(__dirname, 'js');
var dir_html = path.resolve(__dirname, 'html');
var dir_less = path.resolve(__dirname, 'less');
var dir_build = path.resolve(__dirname, 'build');

module.exports = {
    entry: [
        path.resolve(dir_js, 'main.jsx')
    ],
    output: {
        path: dir_build,
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ["", ".jsx", ".js"],
        modulesDirectories: ["js", "less", "node_modules"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },

            // Loaders for font-awesome fonts
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ]),
    ],
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
    devServer: {
        contentBase: dir_build,
    },
};
