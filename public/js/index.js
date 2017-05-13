
$(function(){
	var task_menu=$(".task_menu_list ul li");

    task_menu.on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
       // $(this).siblings().find("a").css("color","black");
        //$(this).find("a").addClass("actived");
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
    var menu_ul=document.getElementsByClassName("task_menu_list")[0];
    tm.setAttribute("src","../public/images/img_"+id+".png");
    for(var i=1;i<=5;i++){
        if(i==id){
            document.getElementsByClassName("text_c"+id)[0].style.display="block";
           var lisa=menu_ul.getElementsByTagName("li")[id-1].getElementsByTagName("a")[0];
            lisa.style.color="#EA5E43";
        }else{
            document.getElementsByClassName("text_c"+i)[0].style.display="none";
            var lisa=menu_ul.getElementsByTagName("li")[i-1].getElementsByTagName("a")[0];
            lisa.style.color="black";

        }
    }
}






