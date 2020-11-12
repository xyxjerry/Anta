window.onload = function() {

    var Number = document.getElementById('number');
    var Psd = document.getElementById('psd');
    var Sub = document.getElementById('sub');

    Sub.onclick = function() {
        if (Number.value == '') {
            alert('姓名不能为空')
            return
        }
        if (Psd.value == '') {
            alert('密码不能为空')
            return
        }
    }
}