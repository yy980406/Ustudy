(function(){
    //二维码获取元素
    var code = head_box.querySelector(".code");
    var show1 = code.querySelector(".show");

    // 二维码划上
    code.onmouseenter = function(){
        show1.style.display = "block";
    }

    code.onmouseleave = function(){
        show1.style.display = "none";
    }


})();