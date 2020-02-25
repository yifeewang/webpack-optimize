const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    // {
    //     main: path.resolve(__dirname, 'src/index.js'),
    //     a: path.resolve(__dirname, 'src/a.js')
    // },
    output: {
        //每次会根据打包产生的的内容产生一个哈希戳
        //hash会以整体文件进行生成哈希戳
        //contentHash 每个文件内容不同  则对应的哈希戳不同
        //chunkHash 表示以入口文件产生一个哈希戳
        filename: '[name].[contentHash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [//loeder的写法，可以写成字符串 也可以写成对象 多个loader可以写成数组
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {//.babelrc 文件
                        presets: ['@babel/preset-env'], //预设  执行从下往上
                        plugins: []  // 执行从上往下
                    }
                }
            },
            //将变量暴露到全局
            // {
            //     test: require.resolve('jquery'), //可以解析(第三方)node_modules目录下的文件路径
            //     use: {
            //         loader: 'expose-loader', //expose-loader将$变量暴露到windows全局
            //         options: '$'
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        // new webpack.ProvidePlugin({ //把jquery模块 给每个模块都提供了一个$变量
        //     '$': 'jquery'
        // })
    ],
    externals: {//从jquery包中 引出变量名$ 符号就是外部的
        'jquery': "$"
    }
}

// console.log(path.resolve('jquery')); // F:\bigFrontend\webpack-optimize\jquery
// console.log(require.resolve('jquery'));  //F:\bigFrontend\webpack-optimize\node_modules\_jquery@3.4.1@jquery\dist\jquery.js
