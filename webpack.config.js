var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:'./src/index.ts',
    output:{
        filename:'index.js',
        path:'dist/js/'
    },
    module:{
        loaders:[
            { test:/\.ts$/, loader:'ts' },
            { 
                test:/\.scss$/,
                loaders:['style-loader', 'css-loader', 'sass-loader'] 
                //loader: ExtractTextPlugin.extract('style!css?sourceMap', 'sass?sourceMap')
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                query:{
                    presets:['es2015']
                }
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('/dist/main.css')
    ]
}