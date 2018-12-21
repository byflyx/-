// 1、导包
const express=require('express');
//导入处理函数
const c_login=require('./controller/login_handle');
const c_topic=require('./controller/c_title')

// 2、实例化router对象
const router=express.Router();

router
    .get('/signin',c_login.show_login)
    .post('/signin',c_login.handleLogin)
    .get('/',c_topic.show_topic)
    //显示文章发布页
    .get('/topic/create',c_topic.showCreateTopic)
    //添加文章
    .post('/createTopic',c_topic.createTopic)
    //用户退出
    .get('/signout',c_login.signinOut)
    //展示文章详情页
    .get('/detail/topic/:topicID',c_topic.showDetailTopic)
    // 删除文章请求
    .get('/topic/:topicID/delete',c_topic.deleteTopic)
    // 文章编辑页展示
    .get('/topic/detail/edit',c_topic.showEditTopic)
    ;

//导出路由对象
module.exports=router;