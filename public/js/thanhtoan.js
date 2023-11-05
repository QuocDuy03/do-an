// Lấy các phần tử DOM của ô tích "Thanh toán qua VNPay" và "Thanh toán khi nhận hàng"
const vnpayCheckbox = document.getElementById('vnpay');
const cashOnDeliveryCheckbox = document.getElementById('cash-on-delivery');

// Sử dụng sự kiện onchange để kiểm tra khi một ô tích thay đổi trạng thái
vnpayCheckbox.addEventListener('change', function () {
    if (vnpayCheckbox.checked) {
        // Nếu ô tích "Thanh toán qua VNPay" được chọn, hủy chọn ô tích "Thanh toán khi nhận hàng"
        cashOnDeliveryCheckbox.checked = false;
    }
});

cashOnDeliveryCheckbox.addEventListener('change', function () {
    if (cashOnDeliveryCheckbox.checked) {
        // Nếu ô tích "Thanh toán khi nhận hàng" được chọn, hủy chọn ô tích "Thanh toán qua VNPay"
        vnpayCheckbox.checked = false;
    }
});

//

var total = localStorage.getItem('cartTotal'); // Giả sử giá trị từ Local Storage là số nguyên
var formattedTotal = parseInt(total).toLocaleString('de-DE') + ' VND'; // Định dạng số và thêm 'VND' vào cuối

document.getElementById('cartTotal').innerText = formattedTotal;

//Tong 
var tongTienElement = document.querySelector('.tongtien h3');
 var total_1= parseInt(total) + 20000;

// Cập nhật giá trị mới vào phần tử h3
tongTienElement.textContent = 'Tổng tiền: ' + parseInt(total_1).toLocaleString('de-DE') + ' VND';



