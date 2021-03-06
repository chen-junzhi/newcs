/**
 * Created by Administrator on 2017/3/4.
 */
//路由操作
    //先加载express
var express=require("express");
var bodyParser=require("body-parser");
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
    console.log(req.body);
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    pool.getConnection(function(err,conn){
        conn.query("select * from user where uname=?",[uname],function(err,result){
            if(err){
                resData.code=0;
                resData.msg="网络连接失败，请稍后重试...";
                res.json(resData);
            }else if(result.length>0){
                resData.code=1;
                resData.msg="用户名已存在，请重新注册!";
                res.json(resData);
            }else{
                conn.query("insert into user values(null,?,?,0)",[uname,pwd],function (err, resu) {
                    conn.release();
                    if(err){
                        resData.code=0;
                        resData.msg="网络连接失败，请稍后重试...";
                        res.json(resData);
                    }else{
                        resData.code=2;
                        resData.msg="注册成功,即将为您跳转登陆界面...";
                        res.json(resData);
                    }
                });
            }
        });
    });
});

//登录
router.post("/user/login",function (req,res,next) {
    var uname=req.body.uname;
    var pwd=req.body.pwd;
    //console.log(uname+"--"+pwd);
    pool.getConnection(function(err,conn){
        if(err){
            resData.code=0;
            resData.msg="网络连接失败，请稍后重试...";
            res.json(resData);
        }else{
            conn.query("select * from user where uname=? and pwd=?",[uname,pwd],function (err,result) {
                conn.release();
                if(err){
                    resData.code=0;
                    resData.msg="网络连接失败，请稍后重试...";
                    res.json(resData);
                } else if(result.length<=0){
                    resData.code=1;
                    resData.msg="用户名或密码错误，请重新输入!";
                    res.json(resData);
                }else{
                    resData.code=2;
                    resData.msg="登陆成功";
                    resData.info=result[0];
                    //把用户信息存储到session里面去
                    req.session.user={
                        _id:result[0].uid,
                        uname:result[0].uname,
                        isAdmin:result[0].isAdmin,
                        realname:result[0].realname,
                        sex:result[0].sex,
                        idcard:result[0].idcard,
                        email:result[0].email,
                        local:result[0].local,
                        pic:result[0].pic
                    };
                    res.json(resData);
                    //console.log(req.session.user);
                }
            })
        }
    })
});

//退出
router.get("/userExit",function (req, res) {
    pool.getConnection(function (err,conn) {
        conn.release();
        if(err){
            console.log(err);
            res.send("0");
        }else{
            req.session.user=null;    //注销成功
            res.send("1");
            //console.log("用户注销成功");
        }
    });
})


//2.把这个路由的文件和主模块连接起来
module.exports=router;/**
 * Created by Administrator on 2017/3/16.
 */
