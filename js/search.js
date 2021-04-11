(function () {
    //获取元素
    var form = document.querySelector('.form');//表单
    var eSecher = form.querySelector('.eSecher');
    var eText = form.querySelector('.eText');//文本框

    eSecher.onmouseover = function () {
        form.style.width = '148px';
        eSecher.style.width = '146px';
        eSecher.style.borderColor = '#ccc';
        eText.style.width = '115px';
        eText.focus(); //得到焦点
    }

    //失焦
    eText.onblur = function () {
        form.style.width = '28px';
        eSecher.style.width = '26px';
        eSecher.style.borderColor = 'transparent';
        eText.style.width = '0';
    }
})();