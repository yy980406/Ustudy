(function(){
    // 精品课程获取元素
    var head_box = document.querySelector("#head_box");
    var list = head_box.querySelector(".list");
    var show = list.querySelector(".show");

    // 精品课程滑上
    list.onmouseenter = function(){
        show.style.height = "70px"
    }

    list.onmouseleave = function(){
        show.style.height = "0"
    }


    // 验证用户信息

    // 获取注册的信息
    var infor = localStorage.getItem("userInfor").split("&");
    var uname = infor[0].split("=")[1];
    var pass = infor[1].split("=")[1];
    
    // 获取表单元素
    var phone = U.getId("phone");
    var pwd = U.getId("pwd");
    var em = U.getId("warn");
    var sub = U.getId("sub");
    
    // 用户点击登录
    sub.onclick = function(){
        var phoneV = phone.value;//用户输入的手机号
        var pwdV = pwd.value;//用户输入的密码
        
        if(uname == phoneV && pass == pwdV){ //登录成功
            window.location.href = "index.html";
            
        }else{ //登录失败
            U.addClass(em,"show");
        }
    }
})();