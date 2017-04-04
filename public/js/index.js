
$(function(){

    //头部切换导航栏
	var lis=$("#head_ul li");
	lis.on("click",function(){
        //var str=location.href;
        //console.log(str);
        //var num=str.split("?")[1].split("=")[1];
        //console.log(num);
        $(this).addClass("active").siblings().removeClass("active");

	});
	var task_menu=$(".task_menu_list ul li");
    task_menu.on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");

	});
})



    //分享显示
    // var alsb=document.getElementById("all_share_box");
    // var bdsmore=document.getElementsByClassName("bds_more")[0];
    // bdsmore.onmouseover=function(){
		// alsb.style.display="block";
    // }
    // bdsmore.onmouseout=function(){
		// alsb.style.display="none";
    // }


//切换
function getStyle(obj,attr){
    if(obj,attr){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

function showPic(id){
	var tm=document.getElementById("task-img");
	tm.setAttribute("src","../public/images/img_"+id+".png");
    for(var i=1;i<=5;i++){
        if(i==id){
            document.getElementsByClassName("text_c"+id)[0].style.display="block";
        }else{
            document.getElementsByClassName("text_c"+i)[0].style.display="none";
        }
    }
}






