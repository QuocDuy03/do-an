
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
    tongTienElement.textContent = tongTien + ' VND';
    //Cập nhật cho Tổng cộng
    carttotal();
  }
  handleCheckboxClick();
}

//Xử lí nút cộng
function handlePlus(button) {
  var itemGioHang = button.closest('.item-gio-hang');
  var amountInput = itemGioHang.querySelector('.soluong input');
  var amount = parseInt(amountInput.value);

  amount += 1;
  amountInput.value = amount;

  var giaTien = parseInt(itemGioHang.querySelector('.gia').textContent.replace(/\./g, "")); // Giá tiền sản phẩm

  var tongTienElement = itemGioHang.querySelector('.Tongtien');
  var tongTien = giaTien * amount;
  tongTienElement.textContent = tongTien + ' VND';
  carttotal();
  handleCheckboxClick();
}


//delete
function handleDelete(button) {
  var itemGioHang = button.closest('.item-gio-hang');
  // Xoá phần tử "item-gio-hang" khi nút xoá được nhấn
  itemGioHang.remove();
  carttotal();
  handleCheckboxClick();
}


//Hàm để tính tổng cộng 
function carttotal() {
  var total1 = 0
  
  const productsCount = document.querySelectorAll('.item-gio-hang').length - 1;
  for(i=0;i<productsCount;i++){
    const checkboxId = 'sellect-product-checkbox-' + i;
    const checkbox = document.getElementById(checkboxId);
    if(checkbox.checked){
      // Get the parent div of the checkbox
      const parentDiv = checkbox.parentElement;

      const sum1ProductId = 'tongTien1SP-'+i;
      var tongTienText = document.getElementById(sum1ProductId).textContent;
      var numericValue = parseInt(tongTienText);
      total1 = total1 + numericValue;
    }
  }

  // Lưu giá trị total1 vào Local Storage
  localStorage.setItem('cartTotal', total1);
  // Cập nhất tổng giá cho  tongtien
  var totalElement = document.querySelector(".thanhtoan");
  // console.log(totalElement)
  // totalElement.innerHTML = total1.toLocaleString('de-DE') + " VND";
  totalElement.innerHTML = total1.toLocaleString('de-DE') + " Đ";
}

// Gọi carttotal khi chạy xong trang
window.onload = carttotal;

// chuyển file
document.getElementById('nut-thanh-toan').addEventListener('click', function () {
  // Chuyển hướng qua trang "Thanhtoan.html"
  window.location.href = '../payment?cart=' + encodeURIComponent(JSON.stringify(cartArray));
  // window.location.href = "/checkout?cart=" + encodeURIComponent(JSON.stringify(cart));
})

//Chuyển về Home khi nhấn tiếp tục mua sắm
function backToHome(){
  window.location.href = '/';
}

//==================================================================================================
//############################################################################
fetch('cart/showCart', {
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
    for(i = 0; i<data.products.length; i++){
      const newProduct = document.createElement('div');
      newProduct.className = 'item-gio-hang';
      newProduct.innerHTML =`
        <input type="checkbox" class="sellect-product-checkbox" id="sellect-product-checkbox-${i}" onclick="handleCheckboxClick()">
        <div class="hinh-anh"> 
          <img src="${data.products[i].thumbnail}"> 
        </div>
        <div class="product-details"> 
          <div class="tensp">${data.products[i].title}</div> 
          <p class="mau-sac">Tồn kho: ${data.products[i].instock_quantity}</p> 
          <p class="size" id="size-infor-${i}">Size: <span>${data.products[i].size}</span></p> 
          <p class="ma-san-pham" id="product-info-${i}">Mã sản phẩm: <span>${data.products[i].product_id}</span></p> 
        </div> 
        <div class="gia"> 
          <span id="product-price-id-${i}">${data.products[i].price}</span><span>Đ</span> 
        </div> 
        <div class="soluong"> 
          <button class="minus-btn" onclick="handleMinus(this)">-</button> 
          <input type="text" value="${data.products[i].quantity}" id="amount-${i}" readonly> 
          <button class="plus-btn" onclick="handlePlus(this)">+</button>
        </div>
        <p class="Tongtien" id="tongTien1SP-${i}">${data.products[i].price*data.products[i].quantity}<span>Đ</span></p>
        <button class="delete-btn" onclick="handleDelete(this)">
          <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> 
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      `
      document.getElementById('gio-hang').appendChild(newProduct);      
    }
})
.catch(err => {
    console.log(err);
}) 



//========================================================================
// document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện khi checkbox được thay đổi
  // document.querySelectorAll('.sellect-product-checkbox').forEach(function (checkbox) {
  //   checkbox.addEventListener('change', function () {
  //     carttotal();
  //   });
// });
//   // Hàm cập nhật tổng tiền
//   function updateTotal() {
//     var total = 0;

//     // Lặp qua tất cả các item-gio-hang
//     document.querySelectorAll('.item-gio-hang').forEach(function (item) {
//       var checkbox = item.querySelector('.sellect-product-checkbox');
//       var price = parseFloat(item.querySelector('.gia span').innerText);
//       var quantity = parseInt(item.querySelector('.soluong input').value);

//       // Nếu checkbox được chọn, thì cộng vào tổng tiền
//       if (checkbox.checked) {
//         total += price * quantity;
//       }
//     });

//     // Hiển thị tổng tiền trong div thanhtoan
//     document.querySelector('.thanhtoan').innerText = total.toLocaleString('vi-VN') + ' VND';
//   }

//   // Gọi hàm cập nhật tổng tiền khi trang được tải
//   updateTotal();
// });

var cartArray=[];

function handleCheckboxClick(){
  cartArray=[];
  const productsCount = document.querySelectorAll('.item-gio-hang').length - 1;
  for(i=0;i<productsCount;i++){
    const checkboxId = 'sellect-product-checkbox-' + i;
    const checkbox = document.getElementById(checkboxId);
    if(checkbox.checked){
      // Get the parent div of the checkbox
      const parentDiv = checkbox.parentElement;

      // Create an object to store information
      const sizeId = 'size-infor-'+i;
      const Id = 'product-info-'+i;
      const quantityId = 'amount-'+i; 
      const total_money = 'tongTien1SP-'+i;
      const price = 'product-price-id-'+i;
      const productInfo = {
          // product_id: parentDiv.querySelector('.tensp').textContent,
          // mauSac: parentDiv.querySelector('.mau-sac').textContent,
          size: parentDiv.querySelector(`#${sizeId} span`).textContent,
          product_id: parentDiv.querySelector(`#${Id} span`).textContent,
          price: parentDiv.querySelector(`#${price}`).textContent,
          quantity: parentDiv.querySelector(`#${quantityId}`).value,
          total_money: (parentDiv.querySelector(`#${total_money}`).textContent.replace(/\VND/g, "")).replace(/\ /g, "")
      };
      cartArray.push(productInfo);
      // Log the product information (you can modify this part)
    }
  }
  carttotal();
}



