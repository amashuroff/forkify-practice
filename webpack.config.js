const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module : {
        rules: [
            {
                test: /\.js$/,              // test for all js files with an .js at the end
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'  // apply babel-loader
                }
            }
        ]
    }
}
