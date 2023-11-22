// Nếu ô tích "Thanh toán qua VNPay" được chọn, hủy chọn ô tích "Thanh toán khi nhận hàng" và ngược lại
const vnpay = document.getElementById('vnpay');
const cashOnDelivery = document.getElementById('cash-on-delivery');

vnpay.addEventListener('change', function () {
    if (vnpay.checked) {
        cashOnDelivery.checked = false;
    }
});
cashOnDelivery.addEventListener('change', function () {
    if (cashOnDelivery.checked) {
        vnpay.checked = false;
    }
});

// Lấy giá trị tổng từ Local Storage.
let total = localStorage.getItem('cartTotal');
let formattedTotal = parseInt(total).toLocaleString('de-DE') + ' VND';

// Hiển thị tổng giá trị trong 'cartTotal'
document.getElementById('cartTotal').innerText = formattedTotal;

// Tính tổng tiền với phí vận chuyển
let tongTienElement = document.querySelector('.tongtien h3');
let totalAmount = parseInt(total) + 20000;

// Cập nhật giá trị mới vào phần tử Tong tiên cuối cùng
tongTienElement.textContent = 'Tổng tiền: ' + totalAmount.toLocaleString('de-DE') + ' VND';



