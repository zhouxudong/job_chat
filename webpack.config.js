var webpack = require("webpack");
var path = require("path");
//var autoprefixer = require("autoprefixer")

module.exports = {
    entry: "./app/main.js",
    output: {
        path: path.join(__dirname,"public/js"),
        filename: "app.chat.js"
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders:[
            { test: /\.vue$/, loader: 'vue-loader'},
            { test:/\.js$/,loader:'babel-loader',exclude:/node_modules/},
            { test: /\.css$/,loader:'style-loader!css-loader'},
            { test: /\.less$/, loader: 'style!css!postcss!less?sourceMap'},
            //{ test: /\.(png|jpg|eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //postcss: [autoprefixer({ browsers: ['last 2 versions'] }) ]
}