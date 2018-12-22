const M_user=require('../models/m_user') 

exports.show_login=(req,res)=>{
    res.render('signin.html');
}

// 2、登录验证
exports.handleLogin=(req,res)=>{
     //获取表单传入的数据--在请求体中，req多body属性
     const body=req.body;
     //得到的结果是对象
    //  console.log(body);

    //邮箱验证-----》操作数据库的结果
    M_user.checkEmail(body.email,(err,data)=>{
        if(err){
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            })
        }
        if(data.length == 0){
            //邮箱不存在
            return res.send({
                code: 1,
                msg: '邮箱不存在'
            })   
        }
        //邮箱正确，验证密码
        if(data[0].password !==body.password){
            return res.send({
                code: 2,
                msg: '密码错误呀'
            })           
        }
        //登录成功，保存session(session里面保存的就是用户信息) 
        req.session.user=data[0];
        // console.log(req.session.user);
         res.send({
                code: 200,
                msg: '验证成功'
            })
        
    })
  
}
// 用户退出
exports.signinOut=(req,res)=>{
    //清除user中的session
    delete req.session.user;
    res.redirect('/signin');
}

//注册用户---显示注册页面
exports.showSignup=(req,res)=>{
    res.render('signup.html');
}

// 注册处理
exports.handleSignup=(req,res)=>{
    //获取表单数据
    const body=req.body;
    //验证邮箱是否存在---body.email==数据库中得到的数据
    M_user.checkEmail(body.email,(err,data)=>{
        if(err) {
            return res.send({
                code: 500,
                msg: '服务器出错'
            })
        }
        // console.log(data);
        if(data.length !== 0) {
            //则说明邮箱存在
            return res.send({
                code: 1,
                msg:'该邮箱存在请重新输入'
            })
        }
        //否则邮箱不存在，可以继续注册---验证昵称
        M_user.checkNickName(body.nickname,(err,data)=>{
            if(err) {
                return res.send({
                    code: 500,
                    msg: '服务器出错'
                })
            }
            //如果昵称存在
            if(data.length !== 0) {
                //则说明邮箱存在
                return res.send({
                    code: 1,
                    msg:'该昵称存在请重新输入'
                })
            }
            //如果昵称不存在，就添加新用户
            M_user.addUser(body,(err,data)=>{
                if(err){
                    return res.send({
                        code: 500,
                        msg: '服务器错了'
                    })
                }
                res.send({
                    code: 200,
                    msg: '注册成功'
                })

            })

        })
    })

    //
}