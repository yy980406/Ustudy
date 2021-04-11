(function () {
    // 精品课程获取元素
    var head_box = document.querySelector("#head_box");
    var list = head_box.querySelector(".list");
    var show = list.querySelector(".show");

    // 获取表单元素
    var main = document.querySelector("#main");
    var phone = main.querySelector("#phone");
    var pwd = main.querySelector("#pwd");
    var pass = main.querySelector("#pass");
    var yzm = main.querySelector("#yzm"); //验证码输入框
    var code_container = main.querySelector("#code_container"); //生成验证码的容器
    var print = main.querySelector(".print"); //验证码错误提示
    var registerBtn = main.querySelector(".registerBtn");
    var left = main.querySelector(".left");


    // 精品课程滑上
    list.onmouseenter = function () {
        show.style.height = "70px"
    }

    list.onmouseleave = function () {
        show.style.height = "0"
    }

    // 表单验证
    //验证手机号(失去焦点)
    phone.onblur = function () {
        var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        checkFn(this, reg);
    }

    // 6-8密码,首位是字母
    pwd.onblur = function () {
        var reg = /^[a-zA-Z]\w{5,7}$/;
        checkFn(this, reg);
    }

    // 再次验证密码
    pass.onblur = function () {
        checkFn(this);
    }


    // 专门验证的函数
    function checkFn(ele, reg) {
        // 获取输入的内容
        var val = ele.value;
        var parent = ele.parentNode;
        // 错误提醒
        var error = parent.querySelector("em");
        // 验证成功提醒
        var success = parent.querySelector("span");
        // 验证空提醒
        var empty = parent.querySelector("mark");
        // 取出创建密码的value
        var oldPwd = pwd.value;

        if (reg) {
            if (val == "") {    //输入内容为空 
                U.addClass(empty, "show");
                U.removeClass(error, "show");
                U.removeClass(success, "show");
            } else if (reg.test(val)) {  //验证成功
                U.addClass(success, "show");
                U.removeClass(error, "show");
                U.removeClass(empty, "show");
            } else {  //验证失败
                U.addClass(error, "show");
                U.removeClass(empty, "show");
                U.removeClass(success, "show");
            }
        } else {
            //再次验证密码的判断 
            if (val == "") {
                U.addClass(empty, "show");
                U.removeClass(error, "show");
                U.removeClass(success, "show");
            } else if (oldPwd == val) {
                //密码一致 
                U.addClass(success, "show");
                U.removeClass(error, "show");
                U.removeClass(empty, "show");
            } else {
                // 密码验证不一致
                U.addClass(error, "show");
                U.removeClass(success, "show");
                U.removeClass(empty, "show");
            }
        }
    }

    // 随机数生成
    // 点击验证码自动换验证码
    code_container.onclick = function () {
        code_container.innerText = U.getRandom(10000, 99999);
    }

    // 验证 验证码
    yzm.onblur = function () {
        // 获取随机数验证码
        var sjs = code_container.innerText;
        // 获取输入的验证码
        var val = this.value;
        if (val == "" || val != sjs) {
            U.addClass(print, "show");
        } else {
            U.removeClass(print, "show");
        }
    }

    // 提交：所有的都验证成功才能提交 
    registerBtn.onclick = function () {
        var oSpan = left.querySelectorAll("span");
        for (var i = 0; i < oSpan.length; i++) {
            //U.hasClass 判断有没有show类名，有的话返回true，没有返回false
            if (U.hasClass(oSpan[i], "show") == false || U.hasClass(print, "show")) {
                // 阻止提交
                return false;
            }
        }

        // ajax发送后台
        var data = "uname=" + phone.value + "&pwd=" + pwd.value;
        U.ajax({
            "type": "get",
            "url": "data/register.txt",
            "data": data,
            "success": function (res) {  //返回1
                if (res == 1) { //用户不存在，可以注册 
                    //form表单提交完，就是在刷新页面 ，就不能再跳转页面啦 
                    localStorage.setItem("userInfor", data); // 创建一个本地存储的 name/value键值对
                    window.location.href = 'login.html';

                } else {
                    alert("用户已存在，不能注册");
                }
            }
        });
    }
})();