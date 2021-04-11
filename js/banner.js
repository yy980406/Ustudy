(function(){
    // 获取元素
    var banner_box = document.querySelector("#banner_box");
    var banner = banner_box.querySelector(".banner");
    var oLis = banner.querySelectorAll("li");
    var left = banner_box.querySelector(".left");
    var right = banner_box.querySelector(".right");
    var dot = banner_box.querySelector(".dot");
    var index = 0; //默认图片从第一张开始

    U.ajax({
        "type":"get",
        "url": "../data/banner.json",
        "success":function(res){
                // 创建小圆点
                var str = "";
                for(var i = 0; i < res.length; i++){
                    str += `<span class="span"></span>`;
                }

                dot.innerHTML = str;

                // 获取每一个小圆点
                var oSpan = dot.querySelectorAll('span');

                // 自动轮播
                banner_box.timer = setInterval(rightHandle,3000);

                // 鼠标进入banner停止自动轮播
                banner_box.onmouseenter = function(){
                    clearInterval(banner_box.timer);
                    left.style.display = "block";
                    right.style.display = "block";
                }

                // 鼠标离开banner停止自动轮播
                banner_box.onmouseleave = function(){
                    banner_box.timer = setInterval(rightHandle,3000);
                    left.style.display = "none";
                    right.style.display = "none";
                }

                // 左点击
                left.onclick = function(){
                    index -- ;
                    if(index < 0) index = oLis.length - 1;
                    change();
                }

                // 右点击
                right.onclick = rightHandle;

                function rightHandle(){
                    index++;
                    if(index >= oLis.length) index = 0;
                    change();
                }

                // 封装
                function change(){
                    // 排他思想
                    for(var i = 0; i < oLis.length;i++){
                        U.move(oLis[i],{opacity : 0});
                        oSpan[i].style.background = "";
                    }

                    oLis[index].style.background = `url("${res[index].src}") no-repeat  50%`;
                    U.move(oLis[index],{opacity : 100});
                    oSpan[index].style.background = "orange";
                }
            }
             

    })
    
})();