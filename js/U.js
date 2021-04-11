var U = (function (window, document) {
    "use strict";

    // window.onload = function(){}
    function addLoad(func) {
        var oldonload = window.onload;
        if (typeof window.onload !== 'function') {
            window.onload = func;
        } else {
            window.onload = function () {
                oldonload();
                func();
            }
        }
    };

    // 命名空间。参考：编写可维护的JavaScript第75页
    function namespace(ns) {
        var parts = ns.split('.');
        var object = this;
        for (var i = 0, len = parts.length; i < len; i++) {
            if (!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }
        return object;
    };

    // 获取元素样式，注意不要用它来获取复合样式，要获取单一样式，要获取显示定义的样式
    // 参数：元素, 样式名  返回带单位的样式值
    var getStyle = typeof (window.getComputedStyle) === 'function' ? function (obj, attr) {
        // 标准浏览器(IE9及以上)
        return window.getComputedStyle(obj)[attr];
    } : function (obj, attr) {
        // IE8及以下
        return obj.currentStyle[attr];
    };


    // 参数：元素, 要改变的样式（json），回调
    // 所要改变的样式，需要在css里显示的定义
    // var move = function (obj, json, callback) {
    //     clearInterval(obj.timer);
    //     var dir, // 方向步长
    //         now, // 当前位置
    //         speed, // 此次应该运动的位置
    //         target; // 目标

    //     obj.timer = setInterval(function () {
    //         var iBtn = true; // 开关

    //         for (var attr in json) {
    //             target = json[attr]; // 目标位置

    //             if (attr === 'opacity') {
    //                 now = Math.round(getStyle(obj, 'opacity') * 100); // 当前位置
    //             } else {
    //                 now = parseInt(getStyle(obj, attr));
    //             };

    //             dir = (target - now) / 8; // 步长

    //             // 给步长取整，dir是否大于0，如果大于0，向上取整，否则向下取整
    //             dir = dir > 0 ? Math.ceil(dir) : Math.floor(dir);

    //             speed = now + dir;

    //             if ((speed >= target && dir > 0) || (speed <= target && dir < 0)) {
    //                 speed = target;
    //             }

    //             // 设置样式
    //             if (attr === 'opacity') {
    //                 obj.style.opacity = speed / 100;
    //                 obj.style.filter = 'alpha(opacity = ' + speed + ')';
    //             } else {
    //                 obj.style[attr] = speed + 'px';
    //             };

    //             if (speed !== target) {
    //                 iBtn = false;
    //             }
    //         }

    //         if (iBtn) {
    //             clearInterval(obj.timer);
    //             callback && setTimeout(function () {
    //                 callback.call(obj);
    //             }, 25);
    //         }
    //     }, 25);
    // };


    // 通过ID获取元素
    var getId = function (id) {
        return document.getElementById(id);
    };

    // 通过class获取元素，IE8及以上返回一个类数组，IE7及以下返回一个数组
    // 接收两个参数时：父级，class名
    // 接收一个参数时：class名，如果只有一个参数，就查找整个页面
    var getClass = document.querySelector ? function (parent, classname) {
        // IE8及以上
        if (typeof (classname) === 'undefined') {
            classname = parent;
            parent = document;
        }
        return parent.querySelectorAll('.' + classname);
    } : function (parent, classname) {
        // IE7及以下
        if (typeof (classname) === 'undefined') {
            classname = parent;
            parent = document;
        }
        var arr = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var eles = parent.getElementsByTagName('*');
        for (var i = 0, len = eles.length; i < len; i++) {
            if (re.test(eles[i].className)) {
                arr.push(eles[i]);
            }
        }
        return arr;
    };


    // 如果有classList属性，则是IE10及以上浏览器
    var isClassList = document.createElement('div').classList;

    // 元素是否有某个class，返回true或false
    var hasClass = isClassList ? function (obj, classname) {
        // IE10及以上
        return obj.classList.contains(classname);
    } : function (obj, classname) {
        // IE9及以下
        var re = new RegExp('\\b' + classname + '\\b');
        return re.test(obj.className);
    };

    // 给元素添加class
    var addClass = isClassList ? function (obj, classname) {
        // IE10及以上
        obj.classList.add(classname);
    } : function (obj, classname) {
        // IE9及以下
        if (!obj.className) {
            // 如果没有class，直接添加
            obj.className = classname;
        } else if (!hasClass(obj, classname)) {
            // 如果没有这个class，则添加
            obj.className += ' ' + classname;
        }
    };

    // 给元素删除某个class
    var removeClass = isClassList ? function (obj, classname) {
        // IE10及以上
        obj.classList.remove(classname);
    } : function (obj, classname) {
        // IE9及以下
        if (hasClass(obj, classname)) {
            // 有这个class，则删除
            var arr = obj.className.split(/\s+/);
            var pos = -1;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === classname) {
                    pos = i;
                    break;
                }
            }
            arr.splice(i, 1);
            obj.className = arr.join(' ');
        }
    };


    // 切换元素的类名，如果有，则删除; 如果没有，则添加
    var toggleClass = isClassList ? function (obj, classname) {
        // IE10及以上
        obj.classList.toggle(classname);
    } : function (obj, classname) {
        // IE9及以下
        if (hasClass(obj, classname)) {
            removeClass(obj, classname);
        } else {
            addClass(obj, classname);
        }
    };

    // 创建元素
    var create = function (ele) {
        return document.createElement(ele);
    };

    // 删除元素
    var remove = function (obj) {
        obj.parentNode.removeChild(obj);
    };

    // 作为子级，添加到最后。参数：父级，要添加的元素
    var append = function (parent, obj) {
        parent.appendChild(obj);
    };

    // 作为子级，添加到最前。参数：父级，要添加的元素
    var prepend = function (parent, obj) {
        var firstChild = parent.children[0];
        if (firstChild) {
            parent.insertBefore(obj, firstChild);
        } else {
            parent.appendChild(obj);
        }
    };

    // 作为兄弟元素，添加到target的前面。参数为：参照物，要添加的元素
    var before = function (target, obj) {
        target.parentNode.insertBefore(obj, target);
    };

    // 作为兄弟元素，添加到target的后面。参数为：参照物，要添加的元素
    var after = function (target, obj) {
        var parent = target.parentNode;
        if (parent.lastChild === target) {
            parent.appendChild(obj);
        } else {
            parent.insertBefore(obj, target.nextSibling);
        }
    };

    // 获取元素到页面的距离，参数为元素。.left代表到左边的距离，.top代表到顶部的距离
    var getPos = function (obj) {
        var pos = { left: 0, top: 0 };
        while (obj) {
            pos.left += obj.offsetLeft;
            pos.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return pos;
    };


    // 去除字符串左右空格
    var trim = String.prototype.trim ? function (str) {
        // IE9及以上
        return str.trim();
    } : function (str) {
        // IE8及以下
        return str.replace(/^\s+|\s+$/g, '');
    };

    // 数组的indexOf方法，接收三个参数：数组，要查找的项，起始值（不写从0开始）
    var indexOf = Array.prototype.indexOf ? function (arr, value, index) {
        // IE9及以上
        index = typeof (index) === 'undefined' ? 0 : index;
        return arr.indexOf(value, index);
    } : function (arr, value, index) {
        // IE8及以下
        index = typeof (index) === 'undefined' ? 0 : index;
        for (var i = index, len = arr.length; i < len; i++) {
            if (arr[i] === value) {
                return i;
            }
        }
        return -1;
    };

    // 数组类型判断
    var isArray = Array.isArray ? function (arr) {
        // IE9及以上
        return Array.isArray(arr);
    } : function (arr) {
        // IE8及以下
        return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
    };

    // 随机数，参数为：最小值，最大值
    var getRandom = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    };


    // 阻止冒泡，接收一个事件对象
    var stop = function (ev) {
        if (ev.stopPropagation) {
            // IE9及以上支持
            ev.stopPropagation();
        } else {
            // IE8及以下
            ev.cancelBubble = true;
        }
    };

    // 阻止事件的默认行为，接收一个事件对象
    var prevent = function (ev) {
        if (ev.preventDefault) {
            // IE9及以上支持
            ev.preventDefault();
        } else {
            // IE8及以下
            ev.returnValue = false;
        }
    };

    // 向上返回120， 向下返回-120
    var getWheelDelta = function (ev) {
        if (ev.wheelDelta) {
            // IE/谷歌
            return ev.wheelDelta;
        } else {
            // 火狐
            return ev.detail * -40;
        }
    };

    // 事件绑定
    var bind = document.addEventListener ? function (obj, event, fn) {
        // IE9及以上
        if (obj.nodeType) {
            obj.addEventListener(event, fn, false);
        }
        // 添加自定义事件
        obj.listeners = obj.listeners || {};
        obj.listeners[event] = obj.listeners[event] || [];
        obj.listeners[event].push(fn);
    } : function (obj, event, fn) {
        // IE8及以下
        if (obj.nodeType) {
            obj.attachEvent('on' + event, function () {
                fn.call(obj);
            });
        }
        // 添加自定义事件
        obj.listeners = obj.listeners || {};
        obj.listeners[event] = obj.listeners[event] || [];
        obj.listeners[event].push(fn);
    };

    // 主动触发自定义事件，参数为：元素，自定义事件名
    var fire = function (obj, event) {
        // 如果自定义事件名不对，则报错
        if (!obj.listeners || !isArray(obj.listeners[event])) {
            // throw new Error('自定义事件有误：' + event);
            return;
        };

        for (var i = 0, len = obj.listeners[event].length; i < len; i++) {
            obj.listeners[event][i]();
        };
    }

    // ajax，参数为：打开方式(get/post)，url地址，传给后端的数据，请求成功的回调
    var ajax = function(obj){
        if(window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();
        }else{
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if(obj.type.toUpperCase() == "GET"){
            var url = obj.data ? obj.url + "?" + obj.data  :  obj.url;
            xhr.open("GET",url,true);
            xhr.send();
        }else{
           xhr.open("POST",obj.url, true);
           xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
           obj.data ? xhr.send(obj.data) : xhr.send();
        }
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){ // 成功 
                    var res = xhr.responseText;
                    res = eval("("+ res +")"); // 服务端返回的数据 ，转成了json对象
                    obj.success && obj.success(res);
                }else{
                    obj.error && obj.error("网络错误");
                }
            }
        }
      
    }

    // 时间戳转 年月日时分
    var getTime = function (num) {
        var date = new Date(num);
        var year = date.getFullYear(); // 年
        var month = date.getMonth() + 1; // 月
        var d = date.getDate(); // 日
        var h = date.getHours(); // 时
        var m = date.getMinutes(); // 分
        return year + '-' + toTwo(month) + '-' + toTwo(d) + ' ' + toTwo(h) + ':' + toTwo(m);
    };

    // 一位前面加0
    var toTwo = function (n) {
        if (n < 10) {
            return '0' + n;
        } else {
            return '' + n;
        }
    };

    // 将秒转成00:00:00
    function time(num) {
        num = Math.floor(num); // 去掉不足1s的部分
        var h = Math.floor(num / 3600); // 小时
        var m = Math.floor(num % 3600 / 60); // 分钟
        var s = num % 60; // 秒
        return toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);
    };
    //动画
    var move =  function(ele, json) {
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            var tag = true; //所有属性都到达目标位置 
            for (var attr in json) {
                if (attr == "opacity") {
                    var cur = getStyle(ele, attr) * 100;
                } else {
                    var cur = parseInt(getStyle(ele, attr));
                }
                var speed = (json[attr] - cur) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    
                if (cur != json[attr]) {   //有属性没有到达目标值 
                    tag = false;
                }
    
                if (attr == "opacity") {
                    ele.style[attr] = (cur + speed) / 100;
                } else {
                    ele.style[attr] = cur + speed + "px";
                }   
            }
    
            if(tag){//所有属性都到达目标值 
                clearInterval(ele.timer);
                
            }
        }, 30)
    }

    // 随机十六进制颜色
    function getRandomColor() {
        var rgb = [];
        for (var i = 0; i < 3; i++) {
            var color = Math.floor(Math.random() * 256).toString(16);
            color = color.length == 1 ? '0' + color : color;
            rgb.push(color);
        }
        return '#' + rgb.join('');
    }

    // 验证码
    function yanzhenma(num) {
        num = typeof num === 'undefined' ? 4 : num; // 默认4位
        var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var s = '';
        for (var i = 0; i < num; i++) {
            var n = getRandom(0, str.length - 1); // 从str中随机出一个下标
            s += str[n];
        }
        return s;
    }

    return {
        addLoad: addLoad, // window.onload
        namespace: namespace, // 命名空间
        getStyle: getStyle, // 获取元素样式
        move: move, // 缓冲运动，接收三个参数：元素, 样式json, 回调(回调中的this为当前元素)

        // 获取元素
        getId: getId, // 通过ID获取元素
        getClass: getClass, // 通过class获取元素

        // 元素class相关
        hasClass: hasClass, // 判断元素是否有某个class
        addClass: addClass, // 给元素添加class
        removeClass: removeClass, // 元素删除某个class
        toggleClass: toggleClass, // 切换元素的类名

        // DOM相关
        create: create, // 创建元素
        remove: remove, // 删除元素
        append: append, // 作为子级，添加到最后。参数：父级，要添加的元素
        prepend: prepend, // 作为子级，添加到最前。参数：父级，要添加的元素
        before: before, // 作为兄弟元素，添加到target的前面。参数为：参照物，要添加的元素
        after: after, // 作为兄弟元素，添加到target的后面。参数为：参照物，要添加的元素
        getPos: getPos, // 获取元素到页面的距离，参数为元素

        // 字符串相关
        trim: trim,

        // 数组相关
        indexOf: indexOf,
        isArray: isArray,

        // 随机数
        getRandom: getRandom,

        // 事件相关
        stop: stop, // 阻止冒泡，参数为事件对象
        prevent: prevent, // 阻止事件的默认行为，参数为事件对象
        getWheelDelta: getWheelDelta, // 鼠标滚轮方向，参数为事件对象
        bind: bind, // 事件绑定
        fire: fire, // 主动触发自定义事件

        ajax: ajax, // ajax

        getTime: getTime, // 时间戳转 年月日时分
        time: time, // 将秒转成 00:00:00
        getRandomColor: getRandomColor, // 随机十六进制颜色
        yanzhenma: yanzhenma // 验证码
    };
})(window, document);