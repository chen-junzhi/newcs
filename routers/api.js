/**
 * Created by Administrator on 2017/3/4.
 */
//路由操作
    //先加载express
var express=require("express");

var mysql=require("mysql");

var pool=mysql.createPool({    //数据连接池
    host:"127.0.0.1",
    port:3306,
    database:"blog",
    user:"root",
    password:"aaaa"
});
//再加载路由
var router=express.Router();

//定义一下统一返回的json格式
var resData;
router.use(function (req,res,next) {
    resData={
        code:-1,
        msg:""
    };
    next();
});




//2.把这个路由的文件和主模块连接起来
module.exports=router;/**
 * Created by Administrator on 2017/3/16.
 */
