//我们希望可以打包一个类库library
import react from 'react'
import reactDom from 'react-dom'

reactDom.render('hello react', document.getElementById('app'))









//----------------------------------------------------------------------------
//可以动态加载video.js 打包的时候需要打包两个 jsonp 创建一个script标签引入即可
//import()语法 -》 动态导入语法(commonsModual)
//import xxx from xxx -> 静态导入语法（es6Module）,只能放在顶部

// let btn = document.createElement('button')

// btn.addEventListener('click', () => {
//     //以防文件过大加载很慢，可以进行预加载webpackPrefetch: true （交给浏览器空闲时间加载）

//     //单页应用 会配置很多路由  路由页面就可能是预先加载的， 不然点下一页时再加载可能就会很慢
//     import(/* webpackChunkName: 'myVideo' *//*webpackPrefetch: true */'./a').then(data => {//动态加载文件
//         console.log(data);
        
//     })
// })
// document.body.appendChild(btn)

//------------------------------------------------------
// import './index.css'
// import {render, rerender} from './a'
// render()

// if(module.hot){ // devServer:{hot :true} //如果存在热更新，若accept无参数，则执行热更新，重新执行一遍文件
//     module.hot.accept(['./a.js'], function(){//若accept有参数，则执行回调 //不会破坏原有状态
//         rerender()
//     })
// }
// console.log(111);
