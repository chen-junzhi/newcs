/**
 * Created by Administrator on 2017/3/16.
 */
/**
 * Created by Administrator on 2017/3/4.
 */
//路由操作
    //先加载express
var express=require("express");
var mysql=require("mysql");
//再加载路由
var router=express.Router();

var pool=mysql.createPool({    //数据连接池
    host:"127.0.0.1",
    port:3306,
    database:"newcs",
    user:"root",
    password:"aaaa"
});

var msg={
    code:0,
    message:""
};

router.get("/",function (req,res,next) {
    res.render("admin/user_task",{
    });
});

router.get("/mysave",function (req,res,next) {
    res.render("admin/mysave",{
    });
});

router.get("/mymsg",function (req,res,next) {
    res.render("admin/mymsg",{
    });
});

router.get("/share",function (req,res,next) {
    res.render("admin/share",{
    });
});

router.get("/info",function (req,res,next) {
    res.render("admin/info",{
    });
});

router.get("/user_set",function (req,res,next) {
    res.render("admin/user_set",{
    });
});




//2.把这个路由的文件和主模块连接起来  //get请求网页，post事物处理
module.exports=router;