$.get("http://localhost:3000/cart").then(data => {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str +=
            `
            <li data-id="${data[i].id}">
            <input type="checkbox" class="ck">
            <img src="${data[i].imgUrl}">
            <span>${data[i].title}</span>
            <span class="perPrice">${data[i].price}</span><span>元</span>
            <span class="minus">-</span>
            <input type="text" value="${data[i].num}" class="num">
            <span class="plus">+</span>
            <span class="perTotalPrice">${parseInt(data[i].price)*data[i].num}</span><span>元</span>
            <span class="del">x</span>
        </li>
        `
    }
    $("#cart-list").html(str);
    //全选
    let checkAll = document.getElementById("checkAll");
    let list = document.querySelectorAll("li");
    let cks = document.querySelectorAll(".ck");
    let perPrice = document.querySelectorAll(".perPrice");
    let minus = document.querySelectorAll(".minus");
    let num = document.querySelectorAll(".num");
    let plus = document.querySelectorAll(".plus");
    let perTotalPrice = document.querySelectorAll(".perTotalPrice");
    let del = document.querySelectorAll(".del");
    let oCartList = document.getElementById("cart-list");

    checkAll.onclick = () => {
        //让所有单个复选框的选中状态和全选复选框的状态一致
        for (let i = 0; i < cks.length; i++) {
            cks[i].checked = checkAll.checked;
        }

        let totalPrice = document.getElementById("totalPrice");
        let price = 0;
        for (let i = 0; i < cks.length; i++) {
            if (cks[i].checked) {
                price += +perTotalPrice[i].innerText;
            }
        }
        totalPrice.innerText = price + "元";
    }

    for (let i = 0; i < cks.length; i++) {
        cks[i].onclick = () => {
            var count = 0; //计数
            for (let j = 0; j < cks.length; j++) {
                if (cks[j].checked) {
                    count++;
                }
            }
            if (count == cks.length) {
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
            let totalPrice = document.getElementById("totalPrice");
            let price = 0;
            for (let i = 0; i < cks.length; i++) {
                if (cks[i].checked) {
                    price += +perTotalPrice[i].innerText;
                }
            }

            totalPrice.innerText = price + "元";
        }
    }

    for (let i = 0; i < minus.length; i++) {
        //减
        minus[i].onclick = () => {
                num[i].value--;
                if (num[i].value < 1) {
                    num[i].value = 1;
                }
                //改单个总价
                perTotalPrice[i].innerText = num[i].value * parseInt(perPrice[i].innerText);
                //改总价
                let totalPrice = document.getElementById("totalPrice");
                let price = 0;
                for (let i = 0; i < cks.length; i++) {
                    if (cks[i].checked) {
                        price += +perTotalPrice[i].innerText;
                    }
                }
                totalPrice.innerText = price + "元";
                //改购物车数据
                let id = list[i].getAttribute("data-id");
                axios.patch(`http://localhost:3000/cart/${id}`, {
                    num: num[i].value
                });
            }
            //加
        plus[i].onclick = () => {
                num[i].value++;
                //改单个总价
                perTotalPrice[i].innerText = num[i].value * parseInt(perPrice[i].innerText);
                //改总价
                let totalPrice = document.getElementById("totalPrice");
                let price = 0;
                for (let i = 0; i < cks.length; i++) {
                    if (cks[i].checked) {
                        price += +perTotalPrice[i].innerText;
                    }
                }
                totalPrice.innerText = price + "元";
                //改购物车数据
                let id = list[i].getAttribute("data-id");
                axios.patch(`http://localhost:3000/cart/${id}`, {
                    num: num[i].value
                });
            }
            //改input
        num[i].onchange = () => {
                if (num[i].value < 1) {
                    num[i].value = 1;
                }
                //改单个总价
                perTotalPrice[i].innerText = num[i].value * parseInt(perPrice[i].innerText);
                //改总价
                let totalPrice = document.getElementById("totalPrice");
                let price = 0;
                for (let i = 0; i < cks.length; i++) {
                    if (cks[i].checked) {
                        price += +perTotalPrice[i].innerText;
                    }
                }
                totalPrice.innerText = price + "元";
                //改购物车数据
                let id = list[i].getAttribute("data-id");
                axios.patch(`http://localhost:3000/cart/${id}`, {
                    num: num[i].value
                });
            }
            //删除
        del[i].onclick = () => {
            oCartList.removeChild(list[i]);
            let id = list[i].getAttribute("data-id");
            axios.delete(`http://localhost:3000/cart/${id}`);
        }
    }
})