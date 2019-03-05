const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|jpg|gif)$/, use: [{loader: 'file-loader', options: {}}]},
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};