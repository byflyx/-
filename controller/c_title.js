
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
    
    body.userId=req.session.id;
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
        res.render('topic/show.html',{
            topicTitle: data,
        });
        // console.log(data);

    })
    
   
}