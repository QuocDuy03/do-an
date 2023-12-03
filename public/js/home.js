// /* ------------------ Home Slider ------------------- */
const imgBox = document.querySelector(".slider-container");
const slidesBanner = document.getElementsByClassName('slideBox');

var i = 0;
function nextSlide() {
  slidesBanner[i].classList.remove('active');
  i = (i + 1) % slidesBanner.length;
  slidesBanner[i].classList.add('active');
}

function prevSlide() {
  slidesBanner[i].classList.remove('active');
  i = (i - 1 + slidesBanner.length) % slidesBanner.length;
  slidesBanner[i].classList.add('active');
}

let itemsDisplay;
if (innerWidth >= 1280)
  itemsDisplay = 4;
else if (innerWidth >= 915)
  itemsDisplay = 3;
else if (innerWidth >= 545)
  itemsDisplay = 2;
else if (innerWidth >= 270)
  itemsDisplay = 1;
else 
  itemsDisplay = 0;
const bestSell = document.querySelector('.bestSell ul');
const itemsBestSellLength = bestSell.querySelectorAll('li').length;
const itemsBestSellHidden = itemsBestSellLength - itemsDisplay;
const itemWidth = 100 / itemsDisplay;
let currentBestSellItem = 0;

function prevBestSellItem() {
  if (currentBestSellItem > 0) {
    currentBestSellItem--;
    updateTransformBestSell();
  }
}

function nextBestSellItem() {
  if (currentBestSellItem < itemsBestSellHidden) {
    currentBestSellItem++;
    // if (currentBestSellItem === itemsBestSellHidden) {
    //   document.querySelector('.next').disabled = true;
    // }
    updateTransformBestSell();
  }
}

function updateTransformBestSell() {
  const transformValue = `translateX(-${currentBestSellItem * itemWidth}%)`;
  bestSell.style.transform = transformValue;
  bestSell.style.transition = `300ms`;
  console.log(currentBestSellItem);
  console.log(itemWidth);
}

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
    // if (currentNewItem === itemsNewHidden) {
    //   document.querySelector('.next').disabled = true;
    // }
    updateTransformNew();
  }
}

function updateTransformNew() {
  const transformValue = `translateX(-${currentNewItem * itemWidth}%)`;
  news.style.transform = transformValue;
  news.style.transition = `300ms`;
}


//############################################################################
fetch('getBestSells', {
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
          const bestSellProduct = document.createElement('li');
          bestSellProduct.innerHTML =`
            <a href="products/details/${product.id}">
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
          document.getElementById('bestSellListItem').appendChild(bestSellProduct);
      })
  })
  .catch(err => {
      console.log(err);
  }) 

  //############################################################################
fetch('getNews', {
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
            <a href="products/details/${product.id}">
                <div class="Item-container hidden">
                    <div class="imgItem">
                        <img src="${product.thumbnail}">
                    </div>
                    <div class="nameItem">
                        ${product.title}
                    </div>
                    <div class="priceItem">
                        ${product.price.toLocaleString()}Đ
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