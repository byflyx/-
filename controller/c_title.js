
const M_topic=require('../models/m_topic');
const moment=require('moment');
//渲染文章列表页
exports.show_topic=(req,res)=>{
    M_topic.showTopic((err,data)=>{
        if(err){
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            })
        }
        res.render('index.html',{
            // 利用模板引擎将数据渲染在页面
            topics: data,  
            // 将保存的用户数据返回给列表页
            user: req.session.user
        });
        // console.log(data);
    })
}

//显示发布文章页
exports.showCreateTopic=(req,res)=>{
    res.render('topic/create.html');
}
exports.createTopic=(req,res)=>{
    //获得表单数据
    const body=req.body;
    
    
    body.createdAt=moment().format();
    
    body.userId=req.session.user.id;
    // console.log(body.userId);
    // console.log(body);
    
    M_topic.insertTopic(body,(err,data)=>{
        if(err){
            return res.send({
                code: 500,
                msg: '服务器错了'
            })
        }
        res.send({
            code: 200,
            msg: '添加文章成功'
        })
    })

}

//显示文章详情页
exports.showDetailTopic=(req,res)=>{
    //在这由req的params属性中保存了动态路由 的标识，得到的值为对象
    // console.log(req.params);//run it .... { topicID: '8' }
    
    const topicID=req.params.topicID;
    // console.log(topicID);//就是传过来的id值
    M_topic.getTopic_titleById(topicID,(err,data)=>{
        if(err) {
            return res.send({
                code: 500,
                msg: '服务器错了'
            })
        }
        //如果查询到的结果为空
        // if(data.length ===0) {
        //     //展示相应的页面
        // }
        res.render('topic/show.html',{
            topicTitle: data[0],
            //将用户的信息也传过去
            sessionUserId: req.session.user ? req.session.user.id : 0
        });
    }) 
}
//删除文章列表
exports.deleteTopic=(req,res)=>{
    const topicID=req.params.topicID;
    M_topic.deleteTopicData(topicID,(err,data)=>{
        if(err) {
            return res.send({
                code: 500,
                msg: '服务器错了'
            })
        }
        if(data.length == 0) {
            return res.send({
                code: 1,
                msg: '该文章已经被删除'
            })
        }
        //文章删除成功，返回列表额页
        res.redirect('/');
    })
}

//显示文章编辑页
exports.showEditTopic=(req,res)=>{
    const topicID=req.params.topicID;
    M_topic.getTopic_titleById(topicID,(err,data)=>{
        if(err) {
            return res.send({
                code: 500,
                msg: '服务器出错了'
            })
        }
        res.render('topic/edit.html',{
            topicTitle: data[0],});
    })
}
exports.editTopic=(req,res)=>{
    //获取表单数据
    const body=req.body;
    const topicID=req.params.topicID;
    M_topic.topicEdit(body,topicID,(err,data)=>{
        if(err){
            return res.send({
                code: 500,
                msg: '服务器异常'
            })
        }
        res.send({
            code: 200,
            msg: '修改文章成功'
        })
    })
}