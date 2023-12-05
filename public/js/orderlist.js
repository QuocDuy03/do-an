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
                    <span class="las la-edit edit-button" data-id="${order.id}"></span>
                    <span class="las la-trash delete-button" data-id="${order.id}"></span>
                </div>
            </td>
        `
            document.querySelector('table tbody').appendChild(tableRow);
        })
        const editButtons = document.querySelectorAll('.edit-button');

        editButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const orderId = e.target.getAttribute('data-id');

                try {
                    const response = await fetch(`/admin/orders/updateStatus/${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: 'Đã giao' }),
                    });

                    const data = await response.json();
                    console.log(data);

                    // Thay đổi trạng thái trên giao diện người dùng
                    const statusCell = e.target.closest('tr').querySelector('td:nth-child(8)');
                    statusCell.textContent = 'Đã giao'; // Cập nhật trạng thái

                    alert("Cập nhật trạng thái thành công");
                } catch (error) {
                    console.error('Error updating status:', error);
                }
            });
        });
    })
