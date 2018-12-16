// 1、导包
const express=require('express');
//导入处理函数
const login=require('./controller/login_handle');

// 2、实例化router对象
const router=express.Router();

router.get('/signin',login.login_handle);
//导出路由对象
module.exports=router;