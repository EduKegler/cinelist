const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotEnv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }), new dotEnv(),
        new CopyWebpackPlugin({ patterns: [{ from: 'public', to: 'public' }] })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/i,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }]
            },
            {
                test: /\.(s)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp|ttf)$/,
                include: path.join(__dirname, 'src/assets'),
                loader: 'file-loader'
            },
            {
                test: /\.(ts)x?$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

        ]
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        port: 3000,
    },
    performance: {
        hints: false,
    },
}