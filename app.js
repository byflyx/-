// 1、导包
const express=require('express');
//导入路由
const router=require('./router');

//2、实例化app对象
const app=express();

// 配置静态资源
app.use('/public',express.static('./public'));

// 配置第三方包
app.use('/node_modules',express.static('./node_modules'));

//配置express-art-template包
app.engine('html', require('express-art-template'));

// 3、配置路由-->使用路由对象
app.use(router);

//4、监听端口
app.listen('12345',()=>{
    console.log('run it ....');
    
})
