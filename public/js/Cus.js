// Lấy tất cả các nút xoá
var deleteButtons = document.querySelectorAll('.delete-button');

// Thêm sự kiện click cho mỗi nút xoá
deleteButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Xác định phần tử cha (dòng) và xóa nó
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  });
});
var result = ('Are you sure to delete');

fetch('/admin/customers/getCustomers', {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
  }
})
  .then(response => {
      if (!response.ok) {
          throw new Error('Fetch request failed');
      }
      return response.json();
  })
  .then(data => {
      data.customers.forEach(customer => {
          const tableRow = document.createElement('tr');
          tableRow.innerHTML = `
          <td>
              <input type="checkbox" id="tick${customer.id}" name="tick${customer.id}" value="${customer.id}">
              <label for="tick${customer.id}" class="tick-checkbox"></label>
          </td>
          <td>${customer.id}</td>
          <td>${customer.fullname}</td>
          <td>${customer.email}</td>
          <td>${customer.phone_number}</td>
          <td>${customer.address}</td>
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
  .catch(err => {
      console.log(err);
  }) 