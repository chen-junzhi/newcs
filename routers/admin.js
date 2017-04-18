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
var bodyParser=require("body-parser");
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
        userInfo:req.session.user
    });
});

router.get("/mysave",function (req,res,next) {
    res.render("admin/mysave",{
        userInfo:req.session.user
    });
});

router.get("/mymsg",function (req,res,next) {
    res.render("admin/mymsg",{
        userInfo:req.session.user
    });
});

router.get("/share",function (req,res,next) {
    res.render("admin/share",{
        userInfo:req.session.user
    });
});

router.get("/info",function (req,res,next) {
    res.render("admin/info",{
        userInfo:req.session.user
    });
});

router.get("/user_set",function (req,res,next) {
    res.render("admin/user_set",{
        userInfo:req.session.user
    });
});

router.post("/user/set",function(req,res,next){
    var opwd=req.body.opwd;
    var npwd=req.body.npwd;
    var uname=req.body.uname;
    console.log(uname);
    //console.log(opwd+"--"+npwd);
    pool.getConnection(function(err,conn){
        if(err){
            msg.code=0;
            msg.message="网络连接失败，请稍后重试...";
            res.json(msg);
        }else{
            conn.query("select pwd from user where pwd=?",[opwd],function (err,result){
                if(err){
                    msg.code=0;
                    msg.message="网络连接失败，请稍后重试...";
                    res.json(msg);
                }else if(result.length<=0){
                    msg.code=1;
                    msg.message="原始密码输入有误，请重新输入！";
                    res.json(msg);
                }else{
                    conn.query("update user set pwd=? where uname=?",[npwd,uname],function(err,result){
                        conn.release();
                        if(err){
                            msg.code=0;
                            msg.message="网络连接失败，请稍后重试...";
                            res.json(msg);
                        }else{
                            msg.code=2;
                            msg.message="密码修改成功，请重新登录！";
                            req.session.user=null;
                            res.json(msg);
                        }
                    });
                }
            });
        }
    });
});




//2.把这个路由的文件和主模块连接起来  //get请求网页，post事物处理
module.exports=router;