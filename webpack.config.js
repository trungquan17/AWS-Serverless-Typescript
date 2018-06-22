var path = require('path');

module.exports = {
    entry: './src/handler.ts',
    target: 'node',
    stats: { warnings: false },
    module: {
        exprContextCritical: false,
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: [/node_modules/, /\.(spec|e2e)\.ts$/]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist'),
        filename: 'handler.js'
    },
    externals: {
        'aws-sdk': true
    },
}
