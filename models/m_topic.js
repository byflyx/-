
// 链家数据库的配置
const connection=require('../config/db-config');
exports.showTopic=(callback)=>{
    const sql='select * from `topics` order by id desc';
    connection.query(sql,(err,data)=>{
        if(err) {
            return callback(err,null);
        }
            callback(null,data);
    })

}
// 将添加的文章追加到数据库中
exports.insertTopic=(body,callback)=>{
    const sql='insert into `topics` set ?';
    connection.query(sql,body,(err,data)=>{
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })

}

//根据传过来的id值找到对应的文章
exports.getTopic_titleById=(topicID,callback)=>{
    const sql='select * from `topics` where id=?';
    connection.query(sql,topicID,(err,data)=>{
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}

//根据传过来的id找到对应的数据，并删除该数据
exports.deleteTopicData=(topicID,callback)=>{
    const sql='delete from `topics` where id=?';
    connection.query(sql,topicID,(err,data)=>{
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}

// 显示文章编辑页
// exports.getTopicEditById=(topicID,callback)=>{
//     const sql='select * from `topics` where id=?';
//     connection.query(sql,topicID,(err,data)=>{
//         if(err) {
//             return callback(err);
//         }
//         callback(null,data);
//     })
// }