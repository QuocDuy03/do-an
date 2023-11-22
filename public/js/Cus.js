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