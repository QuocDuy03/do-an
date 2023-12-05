fetch('/myorder/getOrderDetails', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Fetch request failed');
    }
    return response.json();
})
.then((data) => {
    console.log(data);
    document.querySelector('.quantity-order').innerHTML = data.orderDetails.length;
    data.orderDetails.forEach(orderDetail => {
        addOrderDetail(orderDetail);
    })
})

function addOrderDetail(orderDetail) {
    const order = document.createElement('div');
    order.classList.add('order');
    order.innerHTML = `
    <div class="order-details">
        <img class="product-image" src="${orderDetail.thumbnail}" alt="Ảnh sản phẩm">
        <div class="product-info">
            <h3>${orderDetail.title}</h3>
            <p>Số lượng: ${orderDetail.quantity}</p>
            <p>Size: ${orderDetail.size}</p>
        </div>
        <div class="additional-info">
            <p>Mã sản phẩm: ${orderDetail.product_id}</p>
            <p>Giá: ${orderDetail.price.toLocaleString('de-DE')}Đ</p>
        </div>
        <div class="order-actions">
            <button class="cancel_button">Hủy đơn</button>
        </div>
    </div>
    `;
    document.querySelector('.order-info').appendChild(order);
}