


//1: Hiển thị

hienthiDanhSachItemGioHang();
function hienthiDanhSachItemGioHang() {
  var danhSachItemGiohang = layGioHangTuLocalStorage();

  console.log(danhSachItemGiohang)
  var HTML = chuyenDanhSachItemGioHangSangHTML(danhSachItemGiohang);
  console.log(HTML)

  var nodeGiohang = document.getElementById("gio-hang");
  nodeGiohang.innerHTML = nodeGiohang.innerHTML + HTML;

}

function chuyenDanhSachItemGioHangSangHTML(danhSachItemGiohang) {
  var htmlTong = '';
  for (var i = 0; i < danhSachItemGiohang.length; i++) {
    htmlTong = htmlTong + chuyenDoiTuongItemGioHangSangHTML(danhSachItemGiohang[i]);

  }
  return htmlTong;
}


/* chuyển 1 đối tượng thành html*, input la doi tượng giỏ hang, output:HTML hiển thị item giỏ hàng*/
function chuyenDoiTuongItemGioHangSangHTML(itemGiohang) {
  var sanPham = laySanPhamTheoId(itemGiohang.idSanPham);
  console.log(itemGiohang.idSanPham)
  var html = '   <div class="item-gio-hang">\n' +
    '     <div class="hinh-anh">\n' +
    '       <img src="' + sanPham.hinhAnh + '">\n' +
    '     </div>\n' +
    '     <div class="product-details">\n' +
    '       <div class="tensp">' + sanPham.ten + '</div>\n' +
    '       <p class="mau-sac">Màu sắc: ' + sanPham.color + '</p>\n' +
    '       <p class="size">Size: ' + sanPham.size + '</p>\n' +
    '       <p class="ma-san-pham">Mã sản phẩm:' + sanPham.idSanPham + ' </p>\n' +
    '     </div>\n' +
    '     <div class="gia">\n' +
    '       <span> ' + sanPham.GiaSP.toLocaleString('de-DE') + '</span>\n' +
    '   </div>\n' +
    '     <div class="soluong">\n' +
    '       <button class="minus-btn" onclick="handleMinus(this)"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">\n' +
    '         <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />\n' +
    '       </svg></button>\n' +
    '       <input type="number" value="1" id="amount">\n' +
    '       <button class="plus-btn" onclick="handlePlus(this)"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">\n' +
    '         <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />\n' +
    '       </svg></button>\n' +
    '     </div>\n' +
    '     <p class="Tongtien">  ' + sanPham.GiaSP.toLocaleString('de-DE') + 'VND</p>\n' +
    '   <button class="delete-btn" onclick="handleDelete(this)"><svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">\n' +
    '        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />\n' +
    '       </svg></button>\n' +
    '   </div>';
  return html;

}


//Lấy giỏ hàng từ storage
function layGioHangTuLocalStorage() {
  var gioHang = new Array();
  //TODO: truy cập vào local storage để lấy giỏ hàng
  /* BƯỚC 1: lấy json */
  var jsonGioHang = localStorage.getItem('gioHang');
  /* Bước 2: chuyển json thành đối tượng giỏ hàng */
  if (jsonGioHang != null)
  gioHang= JSON.parse(jsonGioHang);
  return gioHang;
  }

  //Xử lí nút -
  function handleMinus(button) {
    var itemGioHang = button.closest('.item-gio-hang');
    var amountInput = itemGioHang.querySelector('.soluong input');
    var amount = parseInt(amountInput.value);
    
    if (amount > 1) {
      amount -= 1;
      amountInput.value = amount;
      
      var giaTien = parseInt(itemGioHang.querySelector('.gia').textContent.replace(/\./g, "")); // Giá tiền sản phẩm
      
      var tongTienElement = itemGioHang.querySelector('.Tongtien');
      //Tổng tiền
      var tongTien = giaTien * amount;
      tongTienElement.textContent = tongTien.toLocaleString('de-DE') + ' VND';
       //Cập nhật cho Tổng cộng
      carttotal();
    }
  }

  //Xử lí nút cộng
  function handlePlus(button) {
    var itemGioHang = button.closest('.item-gio-hang');
    var amountInput = itemGioHang.querySelector('.soluong input');
    var amount = parseInt(amountInput.value);
    
    amount += 1;
    amountInput.value = amount;
    
    var giaTien =parseInt(itemGioHang.querySelector('.gia').textContent.replace(/\./g, "")); // Giá tiền sản phẩm

    var tongTienElement = itemGioHang.querySelector('.Tongtien');
    var tongTien = giaTien * amount;
    tongTienElement.textContent = tongTien.toLocaleString('de-DE')  + ' VND';
    carttotal();
  }
 
  
//Ham cập nhật giá
function updatePrice(input) {
  var itemGioHang = input.closest('.item-gio-hang');
  var amountInput = itemGioHang.querySelector('.soluong input');
  var amount = parseInt(amountInput.value);
  

  if (amount < 1) {
    amountInput.value = 1;
    amount = 1;
  }

  var giaTien = parseInt(itemGioHang.querySelector('.gia').textContent.replace(/\./g, "")); // Giá tiền sản phẩm
  var tongTienElement = itemGioHang.querySelector('.Tongtien');
  var tongTien = giaTien * amount;
  tongTienElement.textContent = tongTien.toLocaleString('de-DE') + ' VND';

  carttotal();
}

// Cập nhật lại giá khi sự kiện input bị thay đổi
var amountInputElements = document.querySelectorAll('.soluong input');
amountInputElements.forEach(function(input) {
  input.addEventListener('input', function() {
    updatePrice(this);
  });
});



//delete
  function handleDelete(button) {
    var itemGioHang = button.closest('.item-gio-hang');
    // Xoá phần tử "item-gio-hang" khi nút xoá được nhấn
    itemGioHang.remove();
    carttotal();
  }
  
  
  //Hàm để tính tổng cộng 
  function carttotal() {
    var cartItems = document.querySelectorAll("body .gio-hang .item-gio-hang  ");
    console.log(cartItems);
    var total1 = 0

    for (var i = 1; i < cartItems.length; i++) {
      var itemGioHang = cartItems[i]; 
      var tongTienElement = itemGioHang.querySelector('.Tongtien'); 
      var tongTienText = tongTienElement.textContent; 
      console.log(tongTienText)
      var numericValue = parseInt(tongTienText.replace(/\./g, "")); 
      console.log(numericValue);
      total1=total1+numericValue ;
      console.log(total1);
    }

    // Lưu giá trị total1 vào Local Storage
    localStorage.setItem('cartTotal', total1);
    // Cập nhất tổng giá cho  tongtien
    var totalElement = document.querySelector(".thanhtoan");
    console.log(totalElement)
    totalElement.innerHTML =  total1.toLocaleString('de-DE')+ " VND";
  }

  // Gọi carttotal khi chạy xong trang
  window.onload = carttotal;

// chuyển file
document.getElementById('nut-thanh-toan').addEventListener('click', function() {
  // Chuyển hướng qua trang "Thanhtoan.html"
  window.location.href = '../Thanhtoan/Thanhtoan.html';})


  

 
  

 




