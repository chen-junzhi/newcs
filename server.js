/**
 * Created by Administrator on 17-3-4.
 */
//加入路由的原因：目前代码太多，还有不方便整合，
//首先定义路由的路径，
var express=require("express");
var cookieParser=require("cookie-parser");
var session=require("express-session");
var mysql=require("mysql");
var bodyParser=require("body-parser");


//加载模块引擎
var swig=require("swig");

var app=express();


//配置模板引擎
app.engine("html",swig.renderFile);   //后缀名    处理模板引擎渲染的方法
//设置模板引擎所放的目录
app.set("views","./view")   //不可改变   目录
//注册所使用的模板引擎
app.set("view engine","html");    //不可改变    为app.engine这个方法所定义的东西
swig.setDefaults({cache:false});

//静态资源托管
app.use("/public",express.static(__dirname+"/public"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
//session的设置
app.use(session({
    secret:"keyboard cat",  //私密ID,一个session对应着一个ID
    resave:true,            //每次请求，都会重新设置session cookie
    saveUninitialized:true, //无论有没有session cookie,每次请求都会自动添加一个
    cookie:{secure:false},  //https协议   http协议
    cookie:{maxAge:1000*6000}
}));

var pool=mysql.createPool({    //数据连接池
    host:"127.0.0.1",
    port:3306,
    database:"newcs",
    user:"root",
    password:"aaaa"
});
//定义路由的路径
app.use("/admin",require("./routers/admin"));
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));



app.listen(8885,"127.0.0.1",function(err){
    if(err){
        console.log(err);
    }else{
        console.log("服务器启动成功");
    }
})