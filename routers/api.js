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
    database:"newcs",
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

//注册
router.post("/user/register",function (req, res) {
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    pool.getConnection(function(err,conn){
        conn.query("select * from user where uname=?",[uname],function(err,result){
            if(err){
                resData.code=0;
                resData.msg="网络连接失败，请稍后重试";
                res.json(resData);
            }else if(result.length>0){
                resData.code=1;
                resData.msg="用户名已存在，请重新注册";
                res.json(resData);
            }else{
                conn.query("insert into user values(null,?,?,0)",[uname,password],function (err, resu) {
                    conn.release();
                    if(err){
                        resData.code=0;
                        resData.msg="网络连接失败，请稍后重试";
                        res.json(resData);
                    }else{
                        resData.code=2;
                        resData.msg="注册成功";
                        res.json(resData);
                    }
                });
            }
        });
    });
});




//2.把这个路由的文件和主模块连接起来
module.exports=router;/**
 * Created by Administrator on 2017/3/16.
 */
