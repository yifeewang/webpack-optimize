const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const AddAssetsHtmlWebpackPlugin= require('add-asset-html-webpack-plugin')//将JavaScript或者CSS资产添加到html-webpack-plugin插件生成的HTML中
const AddAssetsHtmlCdnWebpackPlugin= require('add-asset-html-cdn-webpack-plugin')//可以为我们添加cdn外链添加到html-webpack-plugin插件生成的HTML中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')// 既能当插件，又能当loader，用来代替style-loader,可以用来把当前抽离的css文件压缩存到指定路径，但不会去重，可以上传到cdn
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin')//对css文件进行压缩，去掉无用代码
const glob = require('glob')


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].video.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], 
                        plugins: []
                    }
                }
            },
            {
                //require.resolve可以解析第三方模块的路径
                test: require.resolve('jquery'),
                use: {
                    loader: 'expose-loader',//把参数作为全局变量挂到windows下面
                    options: '$'
                }
            },
            {
                test: /\.css$/,
                //把css结尾的文件（可能是css也可能是scss）,如果是css， 先用sass-loader（依赖于node-sass）解析成css
                //，再用css-loader解析css文件，最后用style-loader解析放入页面style中
                //use:['style-loader', 'css-loader', 'sass-loader']
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true //开启css热更新
                        }
                    },
                    //'style-loader', 
                    {
                    loader: 'css-loader',//若css里面@import了scss文件，则需要增加参数importLoaders，表示执行前面n个插件。
                    options: {
                        importLoaders: 2
                    }
                },'postcss-loader' , 'sass-loader']// postcss-loader需要与autoprefixer进行搭配，对高版本css语法进行兼容，添加前缀(-webkit_)
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        new AddAssetsHtmlWebpackPlugin({//必须跟在htmlwebpackplugin之后
            filepath: path.resolve(__dirname, 'dll/react.dll.js')
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({//webpack自带的设置模块变量的plugin 但不能设置到window上，要设置到window需要用到expose-loader
            //把juqery模块 给每个模块都提供了一个$变量
            '$': 'jquery'
        }),
        //可以为我们添加cdn外链添加到html-webpack-plugin插件生成的HTML中
        new AddAssetsHtmlCdnWebpackPlugin({
            'jquery': 'https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js'
        }),
        new MiniCssExtractPlugin({//用来把当前抽离的css文件存到指定路径,但是不会去重，可以上传到cdn
            filename: 'css/css.css'
        }),
        new PurgeCssWebpackPlugin({//对css文件进行压缩，去掉无用代码 要配合glob包
            paths: glob.sync('public/**/*',{
                nodir: true
            })
        }),
        new webpack.DllReferencePlugin({
            //我们把react reactdom库打包好，开发react的时候， 就会解析这个文件引用(webpack.dd.js)打包好的react
            manifest: path.resolve(__dirname,'dll/manifest.json')
        })
    ],
    externals: { //从jquery包中引入的$， 符号就是外部的
        'jquery': '$'
    }
}