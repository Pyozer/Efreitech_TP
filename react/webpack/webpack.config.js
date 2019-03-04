const path = require('path');
const mode = process.env.NODE_ENV || "development"

module.exports = {
    mode: mode,
    entry: './src',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    }
};