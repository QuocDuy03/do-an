// Xem ảnh chính
var mainImg = document.getElementById('mainImg');
var smallImg = document.getElementsByClassName('smallImg');

smallImg[0].onclick = () =>{
    mainImg.src = smallImg[0].src;
}
smallImg[1].onclick = () =>{
    mainImg.src = smallImg[1].src;
}
smallImg[2].onclick = () =>{
    mainImg.src = smallImg[2].src;
}
smallImg[3].onclick = () =>{
    mainImg.src = smallImg[3].src;
}
smallImg[4].onclick = () =>{
    mainImg.src = smallImg[4].src;
}
smallImg[5].onclick = () =>{
    mainImg.src = smallImg[5].src;
}

//Chọn màu
let colorPicker = document.getElementsByClassName('colorBox');
for(let i = 0; i < colorPicker.length; i++){
    colorPicker[i].onclick = () =>{
        for (let j = 0; j< colorPicker.length; j++){
            colorPicker[j].style.border = 'none';
        }
        colorPicker[i].style.border = '3px solid #F08A5D'
    }
}


//Chọn size
let sizePicker = document.getElementsByClassName('sizeBox');
for (let j = 0; j<sizePicker.length; j++){
    sizePicker[j].onclick = () =>{
        for (let i = 0;i<sizePicker.length;i++){
            sizePicker[i].style.border = 'none';
        }
        sizePicker[j].style.border = '3px solid #F08A5D';
    }
}

// Tăng giảm số lượng 
document.getElementById('add').onclick = () =>{
    let numberCount =  document.getElementById('numberCount').getAttribute('value');
    numberCount++;
    document.getElementById('numberCount').setAttribute('value',numberCount);
}
document.getElementById('sub').onclick = () =>{
    let numberCount = document.getElementById('numberCount').getAttribute('value');
    if (numberCount > 1){
        numberCount--;
        document.getElementById('numberCount').setAttribute('value',numberCount);
    }
}


//Sản phẩm tương tự

// -------------------------------------------------
// /* ------------------ Home Slider ------------------- */
const itemsDisplay = 4;
const itemWidth = 100 / itemsDisplay;


const news = document.querySelector('.new ul');
const itemsNewLength = news.querySelectorAll('li').length;
const itemsNewHidden = itemsNewLength - itemsDisplay;
var currentNewItem = 0;
function prevNewItem() {
  if (currentNewItem > 0) {
    currentNewItem--;
    updateTransformNew();
  }
}

function nextNewItem() {
  if (currentNewItem < itemsNewHidden) {
    currentNewItem++;
    if (currentNewItem === itemsNewHidden) {
      document.querySelector('.next').disabled = true;
    }
    updateTransformNew();
  }
}

function updateTransformNew() {
  const transformValue = `translateX(-${currentNewItem * itemWidth}%)`;
  news.style.transform = transformValue;
  news.style.transition = `300ms`;
}
