fetch('/admin/orders/getOrders', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}).then(response => {
    if (!response.ok) {
        throw new Error('Fetch request failed');
    }
    return response.json();
})
    .then((ordersData) => {
        ordersData.orders.forEach(order => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
            <td>
                <input type="checkbox" id="tick${order.id}" name="tick${order.id}" value="${order.id}">
                <label for="tick${order.id}" class="tick-checkbox"></label>
            </td>
            <td>${order.id}</td>
            <td>${order.fullname}</td>
            <td>${order.phone_number}</td>
            <td>${order.address}</td>
            <td>${order.order_date}</td>
            <td>${order.total_money}</td>
            <td>${order.status}</td>
            <td>${order.note}</td>
            <td>
                <div class="Action">
                    <span class="las la-edit edit-botton"></span>
                    <span class="las la-trash delete-button"></span>
                </div>
            </td>
        `
            document.querySelector('table tbody').appendChild(tableRow);
        })
    })