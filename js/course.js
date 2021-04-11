(function(){
    var tab1 = document.querySelector("#course_box");//精品课程
    var tab2 = document.querySelector("#cheap_box");//免费课程
    var tab3 = document.querySelector("#face_box");//就业面授

    U.ajax({
        type:"get",
        url:"../data/course.json",
        success : function(res){
            for(var key in res){
                dealData(key,res[key]);
            }
        }
    })

    function dealData(classify,arr){
        var str1 = "";//选项卡中的标题
        var str2 = "";  //选项卡中的对应的ul
        for(var i = 0; i < arr.length; i++){
            var cur = arr[i];
            str1 += `<li>${cur.title}</li>`;

            if(i==0){
                str2 += `<ul class="course_list show clearfix">`
            }else{
                str2 += `<ul class="course_list  clearfix">`
            }
            var list = cur.list;
            for(var j = 0; j < list.length; j++){
                var current = list[j];
                str2 += `<li>
                <img src="${current.src}" alt="">
                <p class="title">${current.title}</p>
                <p class="price">￥${current.price}</p>
                 <p class="time">${current.time}课时</p>
            </li>`
            }
            str2 += `</ul>`;
        }
        

        if(classify == "classify1"){
            tab1.querySelector(".list").innerHTML = str1;
            tab1.querySelector(".bottom").innerHTML = str2;
        }else if(classify == "classify2"){
            tab2.querySelector(".list").innerHTML = str1;
            tab2.querySelector(".bottom").innerHTML = str2;
        }else if(classify == "classify3"){
            tab3.querySelector(".list").innerHTML = str1;
            tab3.querySelector(".bottom").innerHTML = str2;
        }

        tabFn(tab1);
        tabFn(tab2);
        tabFn(tab3);
    }

    // 选项卡切换
    function tabFn(parent){
        var oLis = parent.querySelector(".list").querySelectorAll("li");
        var oUls = parent.querySelectorAll(".course_list ");
        for(var i = 0; i < oLis.length; i++){
            oLis[i].index = i;
            oLis[i].onmouseover = function(){
                for(var j = 0; j < oLis.length; j++){
                    U.removeClass(oLis[j],"on");
                    U.removeClass(oUls[j],"show");
                }
                U.addClass(this,"on");
               U.addClass(oUls[this.index],"show");
            }
        }

        
    }

    
})();