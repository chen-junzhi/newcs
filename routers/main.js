/**
 * Created by Administrator on 2017/3/16.
 */
var express=require("express");
//再加载路由
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({    //数据连接池
    host:"127.0.0.1",
    port:3306,
    database:"blog",
    user:"root",
    password:"aaaa"
});

// router.get("/",function (req,res) {
//     //使用模板引擎去渲染页面，两个参数
//     //1,第一个参数路径    第二个参数：分配给模板所使用的引擎
//
//     res.render("main/index",{
//         userInfo:req.session.user
//     });
// });

router.get("/",function (req,res,next) {
    //第一个参数模板的路径   第二个参数：分配给模板使用的数据
    res.render('main/index',{

    });
});

router.get("/white",function (req,res,next) {
    //第一个参数模板的路径   第二个参数：分配给模板使用的数据
    res.render('main/white',{

    });
});
router.get("/mission",function (req,res,next) {
    //第一个参数模板的路径   第二个参数：分配给模板使用的数据
    res.render('main/mission',{

    });
});
router.get("/reviewed",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    res.render("main/reviewed",{

    });
});
router.get("/new_focus",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    res.render("main/new_focus",{

    });
});
router.get("/article",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    res.render("main/article",{

    });
});


//2.把这个路由的文件和主模块连接起来
module.exports=router;