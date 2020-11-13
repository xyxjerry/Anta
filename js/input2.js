window.onload = function() {

    var Number = document.getElementById('number');
    var Psd = document.getElementById('psd');
    var Sub = document.getElementById('sub');
    var acc = document.getElementById('acceptfile');

    Sub.onclick = function() {

        var phone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        Number.oninput = function() {
            var val = this.value;
            if (phone.test(val)) {
                Number.innerText = "";
            } else {
                Number.innerText = "请输入有效手机号";
            }
        }
        if (Psd.value == '') {
            alert('请输入密码')
            return
        }
        if (acc.checked = false) {
            alert('请勾选阅读协议')
            return
        }
    }
}