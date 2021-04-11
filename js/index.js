(function(){
    // 头部中间导航栏获取元素
    var  cur = document.querySelector(".cur");
    var show = document.querySelector(".show");
    var cur1 = document.querySelector(".cur1");
    var show1 = document.querySelector(".show1");

    // 热门直播获取元素
    var live_box = document.querySelector("#live_box");
    var live = live_box.querySelector(".live");
    var left = live.querySelector(".left");
    
    var video = left.querySelector(".video");
    var right = live.querySelector(".right");
    var list = right.querySelector(".list");

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

    // 热门直播
    U.ajax({
        type:"get",
        url:"../data/live.json",
        success:function(res){
           for(var i = 0; i <res.length; i++){
               //给video添加节点
               video.innerHTML += ` <li>
               <a href="${res[i].href}"><img src="${res[i].url}" alt=""></a>
               <span>未开始</span>
               <p class="title">${res[i].title}</p>
           </li>`;

               //给list添加节点
               list.innerHTML += `<li>
               <div>
                   <span>即将开始</span>
                   <i>${res[i].time}</i>
               </div>
               <h6>${res[i].course}</h6>
           </li>`;
           }

           // 遍历当前右边的所有的li
           var rightLis = list.querySelectorAll("li");
           // 遍历左边的所有的li
           var videoLis = video.querySelectorAll("li");
           
           // 给每一个右边的li绑定事件
           for(var i = 0; i < rightLis.length;i++){
                rightLis[i].index = i;
                rightLis[i].onmouseover = function(){
                    for(var j = 0; j < rightLis.length; j++){
                        videoLis[j].style.display = "none";
                    }
                   videoLis[this.index].style.display = "block";
                }
           }   
        }
    })
})();

          
          