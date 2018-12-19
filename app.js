// 1、导包
const express = require('express');
//导入路由
const router = require('./router');

const bodyParser = require('body-parser');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node'
};
const sessionStore = new MySQLStore(options);
//2、实例化app对象
const app = express();
// 配置静态资源
app.use('/public', express.static('./public'));
// 配置第三方包
app.use('/node_modules', express.static('./node_modules'));
//配置express-art-template包
app.engine('html', require('express-art-template'));
//配置body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
// 配置express-session
// 配置express-mysql-session

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// 3、配置路由-->使用路由对象
app.use(router);

//4、监听端口
app.listen('7000', () => {
    console.log('run it ....');

})