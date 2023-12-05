//Biến toàn cục
var picked_size;
var quantity;
var product_id;


//########################################################################################
var temp;
// Lấy đường dẫn URL hiện tại
const currentUrl = window.location.href;

// Sử dụng biểu thức chính quy để trích xuất id từ URL
const match = currentUrl.match(/\/products\/details\/(\d+)/);

// Kiểm tra xem có trùng khớp hay không
if (match) {
    // Lấy giá trị id từ kết quả trùng khớp
    const productId = match[1];

    // Sử dụng productId trong các yêu cầu fetch
    fetch(`${productId}/showProductDetail`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Fetch request failed with status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        data.products.forEach(product => {
            document.getElementById('saleCount').innerText=product.total_sold_quantity;
            document.getElementById('toCategories').innerText=product.name;
            if(product.name=='Nam') document.getElementById('toCategories').href = '/products/male';
            else if(product.name=='Nữ') document.getElementById('toCategories').href = '/products/female';
            else document.getElementById('toCategories').href = '/products/baby'; 
            document.getElementById('toNoWhere').innerText=product.title;
            document.getElementById('mainImg').src = product.thumbnail;
            document.getElementById('mainProductName').textContent = product.title ;
            document.getElementById('productId').value = product.id;
            document.getElementById('price').textContent = product.price;
            document.getElementById('mainProductDescription').textContent = product.description;
        })
    }) 
    .catch(err => {
        console.log(err);
    }) 
    // ############################################################################
    fetch(`${productId}/showProductSizes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Fetch request failed with status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        data.productSizes.forEach(size =>{
            const sizeBox = document.createElement('label');
            sizeBox.className = 'sizeLabel';
            sizeBox.innerHTML = `<input type="radio" name="size" value="${size.size}" class="sizeBox" required>${size.size}`
            sizeBox.onclick = function() {
                    let sizePicker = document.getElementsByClassName('sizeLabel');
                    for (let i = 0;i<sizePicker.length;i++){
                        // sizePicker[i].style.border = 'none';
                        sizePicker[i].style.backgroundColor = '#DBE2EF';
                    }
                    // this.style.border = '1px solid #3F72AF';
                    this.style.backgroundColor = '#3F72AF';
                    getSelectedSize();
              };
            document.getElementById('sizeDiv').appendChild(sizeBox);
        }) 
        document.querySelector('#sizeDiv input').checked = true;
    })
    .catch(err => {
        console.log(err);
    }) 


  //############################################################################
  fetch(`${productId}/showSimilars`, {
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
        data.products.forEach(product => {
            const newProduct = document.createElement('li');
            newProduct.innerHTML =`
              <a href="${product.id}">
                  <div class="Item-container hidden">
                      <div class="imgItem">
                          <img src="${product.thumbnail}">
                      </div>
                      <div class="nameItem">
                          ${product.title}
                      </div>
                      <div class="priceItem">
                          ${product.price}Đ
                      </div>
                  </div>
              </a>
            `
            document.getElementById('newListItem').appendChild(newProduct);
        })
    })
    .catch(err => {
        console.log(err);
    }) 

} else {
    console.error('Không tìm thấy ID trong URL.');
}

  //############################################################################
 
// Tăng giảm số lượng 
document.getElementById('add').onclick = () =>{
    let numberCount =  document.getElementById('numberCount').getAttribute('value');
    numberCount++;
    document.getElementById('numberCount').setAttribute('value',numberCount);
    getSelectedSize()
}
document.getElementById('sub').onclick = () =>{
    let numberCount = document.getElementById('numberCount').getAttribute('value');
    if (numberCount > 1){
        numberCount--;
        document.getElementById('numberCount').setAttribute('value',numberCount);
    }
    getSelectedSize()
}


//Sản phẩm tương tự

// -------------------------------------------------
// /* ------------------ Home Slider ------------------- */
const itemsDisplay = 4;
const itemWidth = 100 / itemsDisplay; 
let news = temp;
let itemsNewLength;
// setTimeout(function(){
    news = document.querySelector('.new ul');
//     itemsNewLength = news.querySelectorAll('li').length;
// },1000);
const itemsNewHidden = itemsNewLength - itemsDisplay;
var currentNewItem = 0;
function prevNewItem() {
  if (currentNewItem > 0) {
    currentNewItem--;
    updateTransformNew();
  }
  console.log(currentNewItem);
}

function nextNewItem() {
  if (currentNewItem < itemsNewHidden) {
    currentNewItem++;
    // if (currentNewItem === itemsNewHidden) {
    //   document.querySelector('.next').disabled = true;
    // }
    updateTransformNew();
  }
  console.log(currentNewItem);
}

function updateTransformNew() {
  const transformValue = `translateX(-${currentNewItem * itemWidth}%)`;
  news.style.transform = transformValue;
  news.style.transition = `300ms`;
}


function getSelectedSize() {
    var picked_sz;
    var radioButtons = document.querySelectorAll('.sizeBox');
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            picked_sz = radioButtons[i].parentElement;
        }
    }
    picked_size = picked_sz.textContent;
    quantity = document.getElementById('numberCount').value;
    product_id = document.getElementById('productId').value;
}

// Lên lịch gọi hàm getSelectedSize() sau 2000 mili giây (2 giây)
setTimeout(getSelectedSize, 200);  

//Chuyển qua cart khi nhấn mua ngay
// document.getElementById('buyNowButton').addEventListener(onclick,function(){
//     this.preventDefault();
//     window.location.href ='/cart';
// });

document.getElementById('productInfoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('/products/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: product_id,
                quantity: quantity,
                size: picked_size,
            })
        },);        
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
            alert('Đã thêm vào giỏ');
        }
        if(data.message == 'Invalid token'){
            alert('Lỗi nhận diện người dùng');
        }
    } 
    catch (err) {
        console.log(err);
    }
})



