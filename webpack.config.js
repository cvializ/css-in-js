/**
 * This file is only used for running a dev server with helpers.
 * It does not imply that a build step is necessary for this framework
 */

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    output: {
        path: __dirname,
        filename: 'development.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [require.resolve('react-refresh/babel')],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new ReactRefreshWebpackPlugin()],
    devServer: {
        hot: true,
        https: true,
        static: {
            directory: __dirname,
        },
    },
};
