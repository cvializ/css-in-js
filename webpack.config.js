/**
 * This file is only used for running a dev server with helpers.
 * It does not imply that a build step is necessary for this framework
 */

module.exports = {
    mode: 'development',
    output: {
        path: __dirname,
        filename: 'development.js',
        publicPath: '/',
    },
    devServer: {
        hot: true,
        https: true,
        static: {
            directory: __dirname,
        },
    },
};
