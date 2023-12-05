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
let tongTienElement = document.querySelector('#tong-tien-id');
let totalAmount = parseInt(total);

// Cập nhật giá trị mới vào phần tử Tong tiên cuối cùng
tongTienElement.textContent = totalAmount.toLocaleString('de-DE');

document.getElementById('giao-hang-tan-noi').addEventListener('change',function(){
    if(this.checked){
        totalAmount += parseInt(document.getElementById('id-phi-giao-hang').textContent.replace(/\./g, ""));
        tongTienElement.textContent = totalAmount.toLocaleString('de-DE');
        document.getElementById('id-phi-giao-hang-checked').innerText = document.getElementById('id-phi-giao-hang').textContent;
    }
    else{
        totalAmount -= parseInt(document.getElementById('id-phi-giao-hang').textContent.replace(/\./g, ""));
        tongTienElement.textContent = totalAmount.toLocaleString('de-DE');
        document.getElementById('id-phi-giao-hang-checked').innerText = 0;
    }
})

// Quay lại giỏ hàng khi nhấn nút
function backToCart(){
    window.location.href = '/cart';
}

//=============================================================================================================
// Đọc tham số từ URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Lấy thông tin giỏ hàng từ URL
var cartParam = getParameterByName('cart');

if (cartParam) {
    // Giải mã JSON và sử dụng thông tin giỏ hàng
    var cartArray = JSON.parse(decodeURIComponent(cartParam));

    // Hiển thị thông tin giỏ hàng hoặc thực hiện các thao tác khác
    console.log(cartArray);
}
//=============================================================================================================

var ho_ten = document.getElementById('ho-ten').value;
var email_user = document.getElementById('email-user').value;
var dia_chi = document.getElementById('dia-chi').value;
var sdt = document.getElementById('sdt').value;
var ghi_chu = document.getElementById('ghi-chu').value;
var tong_tien = parseInt(document.getElementById('tong-tien-id').textContent.replace(/\./g, ""));
var orderInfo = [{
    ho_ten: ho_ten,
    email_user: email_user,
    dia_chi: dia_chi,
    sdt: sdt,
    ghi_chu: ghi_chu,
    tong_tien: tong_tien,
}];

function setOrderInfo(){
    orderInfo[0].ho_ten = document.getElementById('ho-ten').value;
    orderInfo[0].email_user = document.getElementById('email-user').value;
    orderInfo[0].dia_chi = document.getElementById('dia-chi').value;
    orderInfo[0].sdt = document.getElementById('sdt').value;
    orderInfo[0].ghi_chu = document.getElementById('ghi-chu').value;
    orderInfo[0].tong_tien = parseInt(document.getElementById('tong-tien-id').textContent.replace(/\./g, ""));
}

for (i=0; i< cartArray.length; i++){
    orderInfo.push(cartArray[i]);
}


//=============================================================================================================
const form = document.querySelector('#buyFormId');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {

        const res = await fetch('/payment/thanhToan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderInfo)
        },)

        const data = await res.json(); 

        if (!data) {
            throw new Error('Fetch request failed');
        }
        if(data.message == 'User not found'){
            alert('Vui lòng đăng nhập trước');
        }
        if(data.message == 'Internal server error'){
            alert('Đã có trong giỏ rồi');
        } 
        if (data.message == 'Thêm thành công') {
            // window.history.back(); 
            alert('Đặt hàng thành công');
        }
        if(data.message == 'Invalid token'){
            alert('Lỗi nhận diện người dùng');
        }
    } 
    catch (err) {
        console.log(err);
    }
})