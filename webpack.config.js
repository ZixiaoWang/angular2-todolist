var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'main': './app/main.ts'
    },
    output:{
        path:'src/',
        filename:'app.[name].js'
    },
    module:{
        loaders:[
            {
                test:/\.ts$/,
                loader:'ts'
            },
            {
                test:/\.scss$/,
                //loaders:['style', 'css?sourceMap', 'sass?srouceMap']
                loader:ExtractTextPlugin.extract({
                    loader:'css?sourceMap!sass?sourceMap',
                    fallbackLoader:'style'
                })
            }
        ]
    },
    resolve:{
        extensions:['.ts','.scss','.js','']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),
        new ExtractTextPlugin('style/main.css')
    ]
}