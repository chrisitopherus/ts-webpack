import * as path from 'path';

import TerserPlugin from "terser-webpack-plugin";

const PROD = JSON.parse(process.env.PROD_ENV || "0");

const config = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    watchOptions: {
        ignored: /node_modules|dist/,
    },
    optimization: {
        minimize: !!PROD,
        minimizer: [new TerserPlugin()],
    },
};

export default config;
