const webpack = require('webpack')
const path = reuire('path')

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: 'react.dll.js',
        library: 'react',// 以var a = ()() 这种模式代替打包后的自执行函数
        // libraryTarget: 'commonjs2',//表示我要以commonjs规范导出一个类库
        path: require('path').resolve(__dirname, 'dll')
    },
    plugins: [
        new webpack.DllPlugin({
            name: 'react',
            path: path.resolve(__dirname,'dll/manifest.json')
        })
    ]
}


//我们写代码的时候
// import react from 'react'
// import reactDom from 'react-dom'

//用dll提前把 react reactdom 先打包好
//开发的时候 直接使用打包好的结果