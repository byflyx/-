//该文件夹将用户部分的数据库操作提取出来

//导入路由配置模块
const connection=require('../config/db-config');
  //验证邮箱
  exports.checkEmail=(email,callback)=>{
    const sql='select * from `users` where email=?'
    connection.query(sql,email,(err,data)=>{
        //在这将结果返回给处理页
        if(err) {
            callback(err,null);
        }else {
            callback(null,data);
        }
    })
  }
  //验证昵称
exports.checkNickName=(nickName,callback)=>{
    const sql ='select * from `users` where nickName=?';
    connection.query(sql,nickName,(err,data)=>{
        if(err) {
            callback(err,null);
        }else {
            callback(null,data);
        }
    })
    
}
// 添加新用户
exports.addUser=(body,callback)=>{
    const sql='insert into `users` set ?';
    connection.query(sql,body,(err,data)=>{
        if(err) {
            callback(err,null);
        }else {
            callback(null,data);
        }
    })
}
  