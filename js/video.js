(function(){
    // 头部中间导航栏获取元素
    var leftNav = document.querySelector(".leftNav")
    var  cur = leftNav.querySelector(".cur");
    var show = leftNav.querySelector(".show");
    var cur1 = leftNav.querySelector(".cur1");
    var show1 = leftNav.querySelector(".show1");

    // 视频部分获取元素
    var video_box = document.querySelector("#video_box");
    var line = video_box.querySelector(".line");
    var li1 = video_box.querySelector(".li1");
    var speed = video_box.querySelector(".speed");
    var li2 = video_box.querySelector(".li2");

    // 获取视频控制条中的元素
    var video = video_box.querySelector("#video");
    var btn = video_box.querySelector(".btn");
    var curTime = video_box.querySelector(".curTime");
    var curBar = video_box.querySelector(".cur");
    var ctrol_btn = video_box.querySelector(".ctrol_btn");
    var totalTime = video_box.querySelector(".totalTime");
    var list = video_box.querySelector(".list");

    // 获取学员评价
    var course_box = document.querySelector("#course_box");
    var primse = course_box.querySelector(".primse");
    var oI = primse.querySelector("i");
    var ping = primse.querySelector(".ping");
    var oSpans = ping.querySelectorAll("span");
    var txt = primse.querySelector("#txt");
    var btn_send = primse.querySelector(".btn_send");
    var num = primse.querySelector(".num");
    var ipt = primse.querySelector("#ipt");
    var comment = primse.querySelector(".comment");
    var numText = primse.querySelector(".num");

    // 悬浮cur让下边的div显示
    cur.onmouseover = function(){
        show.style.display = "block";
    }

    cur.onmouseout = function(){
        show.style.display = "none";
    }

    // 悬浮cur1让下边的div显示

    cur1.onmouseover = function(){
        show1.style.display = "flex";
    }

    cur1.onmouseout = function(){
        show1.style.display = "none";
    }

    // 悬浮线路
    line.onmouseover = function(){
        li1.style.display = "block";
    }

    line.onmouseout = function(){
        li1.style.display = "none";
    }

    // 悬浮倍速
    speed.onmouseover = function(){
        li2.style.display = "block";
    }

    speed.onmouseout = function(){
        li2.style.display = "none";
    }

    // 获取视频的总时长
    video.oncanplay = function(){
        totalTime.innerHTML= U.time(video.duration);
    }

   

    // 视频时间改变
    video.ontimeupdate = function(){
        curTime.innerHTML = U.time(video.currentTime);
        curBar.style.width = video.currentTime / video.duration * 550 + "px";
        ctrol_btn.style.left = video.currentTime / video.duration * 550 + "px";

        if(curTime.innerHTML == totalTime.innerHTML){
            btn.style.cssText = 'background: url("../img/offcn_icnolh04.png")';
        }
    }

    // 动态获取数据
    U.ajax({
        "type" : "get",
        "url": "../data/video.json",
        "success": function(res){
            video.currentTime = 0;
            console.log(res);
            var str = "";
            for(var i = 0; i < res.length; i++){
                var cur = res[i];
                str += `<li _src = "${cur.src}">${cur.title}</li>`;
            }
            list.innerHTML = str;
            var oLis = list.children;
            for(var j = 0 ; j < oLis.length; j++){
                oLis[j].onclick = function(){
                    video.src = this.getAttribute("_src");
                    curBar.style.width = "0px";
                    ctrol_btn.style.left = "0px";
                    btn.style.cssText = 'background: url("../img/offcn_icnolh04.png")';
                    curTime.innerHTML = U.time(video.currentTime);

                    // 定义一个变量默认指定视频的状态
                    // var flag = true;
                    btn.flag = true;
                    // 点击按钮视频播放
                    btn.onclick = function(){
                        if(this.flag){
                            video.play();
                            this.style.cssText = 'background: url("../img/offcn_icnolh03.png")';
                            this.flag = false;
                        }else{
                            video.pause();
                            this.style.cssText = 'background: url("../img/offcn_icnolh04.png")';
                            this.flag = true;
                        }
                    }

                }
            }

        }
    });

    // 学员评价
    // 点击星星
    for(var i = 0; i < oSpans.length; i++){
        var flag = oSpans[i].flag;
        oSpans[i].onclick = function(){
            if(this.flag){
                this.className = "";
                this.flag = false;
            }else{
                this.className = "on";
                this.flag = true;
            }
        }
    }

    // 点击发送按钮
    btn_send.onclick = function(){
        var sum = 0;
        // 先看星星有没有评分
        var flag = false;//默认没有评分
        for(var i = 0 ; i <oSpans.length; i++){
            if(U.hasClass(oSpans[i],"on")){
                sum++;
                flag = true;
            }
        }
        if(flag == false){
            alert("先点星星评分~");
            return;
        }

        // 第二步看看有没有文字评论
        var val= txt.value;
        if(val.trim() == ""){
            alert("要文字评论！");
            return
        }

        var str1 = "";
        str1 = `<li>
        <p class="user">
            <img src="img/nim2.jpg" alt="">
        `;
        // 字符串拼接 + 判断有没有匿名
        if(!ipt.checked){
            str1 += `<em>Lily</em>`;
        }else{
            str1 += `<em>匿名评论</em>`;
        }

        // 判断星星的个数
        for(var i = 0; i < oSpans.length; i++){
            if(i < sum){
                str1 += `<span class="on"></span>`;
            }else{
                str1 += `<span></span>`;
            }
        }

        str1 += `</p>`;
        str1 +=  `<p class="user_text">${val}</p>`;
        comment.innerHTML += str1;

        txt.value = ""; //输入框清空
        numText.innerText = 0;// 计算文字的框为0
        var oLis = comment.children;
        oI.innerText = oLis.length; //更改累计评论条数
        
    }

    // 计算输入字符的个数
    txt.onkeyup = function(){
        var val = this.value;
        var length = val.length;
        if(length > 200){
            val = val.substr(0,200);
            this.value = val;
        }

        numText.innerText = 200 - length;
        console.log(numText);
    }
})();