let id = location.search.split("=")[1];
$.get(`http://localhost:3000/productlist?id=${id}`).then(data => {
    // console.log(data);
    let str = "";
    str +=
        `
        <div class="main-left" id="${data[0].id}">
            <img src="${data[0].imgUrl}" alt="" id="datail-img">
        </div>
        <div class="main-right">
        <p id="datail-title">${data[0].title}</p>
        <span>￥</span><span id="datail-price">${data[0].price}</span>
        <div class="manjian">
            <span>促销</span><br>
            <span>下单立减10元满249减20满300减60满359减80满459减100</span>
        </div>
        <input type="text" value="1" id="num">
        <div class="incar">
            <a href="javascript:void(0)" id="join">加入购物车</a>
        </div>
    </div>
    `
    $("#detail-main").html(str);
    $("#join").click(function() {
        axios.get("http://localhost:3000/cart", {
            params: {
                id: id
            }
        }).then(data => {
            if (data.data.length == 0) {
                axios.post("http://localhost:3000/cart", {
                    id: id,
                    imgUrl: $("#datail-img").attr("src"),
                    title: $("#datail-title").text(),
                    price: $("#datail-price").text(),
                    num: $("#num").val()
                });
                alert("添加成功!");
                window.location.href = "cart.html";
            } else {
                axios.get("http://localhost:3000/cart", {
                    params: {
                        // username: username,
                        id: id
                    }
                }).then(gai => {
                    let num = Math.floor(gai.data[0].num);
                    num += Math.floor($("#num").val());
                    axios.patch(`http://localhost:3000/cart/${id}`, {
                        num: num
                    });
                    alert("添加成功!");
                    window.location.href = "cart.html";
                })
            }
        })
    })
})