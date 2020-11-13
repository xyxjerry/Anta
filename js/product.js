$.get("http://localhost:3000/productlist").then(data => {
    let str = "";
    for (let j = 0; j < 10; j++) {
        let i = Math.floor(Math.random() * data.length + 1)
        str +=
            `
        <li class="productMid-list">
            <a href="detail.html?id=${data[i].id}">
                <img src="${data[i].imgUrl}" alt="">
            </a>
            <p>${data[i].title}</p>
            <span>￥</span><span>${data[i].price}</span>
        </li>
        `
    }
    console.log(str)
    $(".productMid-main").html(str);
})