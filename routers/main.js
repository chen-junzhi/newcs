/**
 * Created by Administrator on 2017/4/23.
 */


var express=require("express");
//再加载路由
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({    //数据连接池
    host:"127.0.0.1",
    port:3306,
    database:"newcs",
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
        userInfo:req.session.user
    });
});

router.get("/white",function (req,res,next) {
    //第一个参数模板的路径   第二个参数：分配给模板使用的数据
    res.render('main/white',{
        userInfo:req.session.user
    });
});

router.get("/mission",function (req,res,next) {
    //第一个参数模板的路径   第二个参数：分配给模板使用的数据
    //确保绝对是从第一页开始的
    var pageNo=Number(req.query.pageNo||1);
    var size=4;
    var tid=req.query.tid;
    var num=req.query.num;
    var word=req.query.word;
    var keyWord=req.query.keyWord;
    //console.log(word);
    pool.getConnection(function (err,conn) {
        conn.query("select * from type",function (err,r) {
            conn.query("select * from taskInfo",function(err,result) {
                var count=result.length;
                var pages=Math.ceil(count/size);
                pageNo=Math.min(pageNo,pageNo);
                pageNo=Math.max(pageNo,1);
                if(tid){
                    conn.query("select skid,uid,type.tid,tname,title,price,num,pubTime,pic from taskInfo,type where type.tid=taskInfo.tid and type.tid=? order by tid limit ?,?", [tid,size*(pageNo-1),size],function(err,rs){
                        conn.release();
                        if(err){
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                msg:"暂无消息",
                                Types:r
                            });
                        }else{
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                allTask:rs,
                                Types:r,
                                tag:"mission",
                                pageNo:pageNo,
                                pages:pages,
                                count:count,
                                size:size
                            });
                            // console.log(r);
                        }
                    })
                }else if(word){
                    conn.query("select skid,tname,title,price,num,pubTime,pic from taskInfo,type where type.tid=taskInfo.tid  and tname=? order by type.tid limit ?,?",[word,size*(pageNo-1),size],function (err, rr) {
                        conn.release();
                        if(err||rr.length<=0){
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                msg:"暂无任务",
                                Types:r
                            });
                        }else{
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                allTask:rr,
                                Types:r,
                                tag:"mission",
                                pageNo:pageNo,
                                pages:pages,
                                count:count,
                                size:size
                            });
                            //console.log(r);
                        }
                    });
                }else if(keyWord){
                    conn.query("select skid,uid,type.tid,tname,title,price,num,pubTime,pic from taskInfo,type where type.tid=taskInfo.tid and title like '%"+keyWord+"%' order by type.tid limit ?,?",[size*(pageNo-1),size],function(err,rs){
                        conn.release();
                        if(err||rs.length<=0){
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                msg:"暂无消息",
                                Types:r
                            });
                        }else{
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                allTask:rs,
                                Types:r,
                                tag:"mission",
                                pageNo:pageNo,
                                pages:pages,
                                count:count,
                                size:size
                            });
                            //console.log(r);
                        }
                    })
                }else{
                    conn.query("select skid,uid,type.tid,tname,title,price,num,pubTime,pic from taskInfo,type where type.tid=taskInfo.tid order by tid limit ?,?",[size*(pageNo-1),size],function(err,rs){
                        conn.release();
                        if(err||rs.length<=0){
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                msg:"暂无消息",
                                Types:r
                            });
                        }else{
                            res.render("main/mission",{
                                userInfo:req.session.user,
                                allTask:rs,
                                Types:r,
                                tag:"mission",
                                pageNo:pageNo,
                                pages:pages,
                                count:count,
                                size:size
                            });
                            //console.log(r);
                        }
                    })
                }

            })});
    })

});
router.get("/reviewed",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    res.render("main/reviewed",{
        userInfo:req.session.user
    });
});
router.get("/new_focus",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    res.render("main/new_focus",{
        userInfo:req.session.user
    });
});
router.get("/article",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    res.render("main/article",{
        userInfo:req.session.user
    });
});
router.get("/task/apply",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    res.render("main/article",{
        userInfo:req.session.user
    });
});

router.get("/detail_task1",function (req,res) {
    //使用模版引擎去渲染页面，两个参数： 路径 分配给这个页面使用的数据
    var skid=req.query.skid;
    //console.log(skid);
    pool.getConnection(function(err,conn){
        conn.query("select skid,uid,type.tid,tname,title,price,num,pubTime,pic from taskinfo,type where type.tid=taskinfo.tid and skid=?",[skid],function (err,rs) {
            conn.release();
            if(err||rs.length<=0){
                res.render("main/detail_task1",{
                    userInfo:req.session.user,
                    msg:"暂无消息"
                });
            }else{
                res.render("main/detail_task1",{
                    userInfo:req.session.user,
                    allTask:rs
                });
            }
        })
    })

});
router.get("/detail_task",function (req,res) {
    var skid=req.query.skid;
    // console.log(skid);
    pool.getConnection(function(err,conn){
        conn.query("select skid,uid,type.tid,tname,title,price,num,pubTime,pic from taskinfo,type where type.tid=taskinfo.tid and skid=?",[skid],function (err,rs) {
            conn.release();
            if(err||rs.length<=0){
                res.render("main/detail_task",{
                    userInfo:req.session.user,
                    msg:"暂无消息"
                });
            }else{
                res.render("main/detail_task",{
                    userInfo:req.session.user,
                    allTask:rs
                });
            }
        })
    })
});




//2.把这个路由的文件和主模块连接起来
module.exports=router;