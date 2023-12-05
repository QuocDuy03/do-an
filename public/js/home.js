// /* ------------------ Home Slider ------------------- */
const imgBox = document.querySelector(".slider-container");
const slidesBanner = document.getElementsByClassName('slideBox');

let i = 0;
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
// ------------------------- Slides BestSell --------------------------------------------------
function prevBestSellItem() {
  document.querySelector(".slider-product-best-sell").style.right = 0 * 110 + "%"
}

function nextBestSellItem() {
  document.querySelector(".slider-product-best-sell").style.right = 1 * 110 + "%"
}

function prevNewsItem() {
  document.querySelector(".slider-product-news").style.right = 0 * 110 + "%"
}

function nextNewsItem() {
  document.querySelector(".slider-product-news").style.right = 1 * 110 + "%"
}

//############################################################################

const listItemBestSell = document.querySelectorAll(".list-item-best-sell");
let indexBestSell = 0, countBestSell = 1;

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
      bestSellProduct.innerHTML = `
            <a href="products/details/${product.id}">
              <img src="${product.thumbnail}">
              <div class="item-text">
                  <div class="nameItem">
                    ${product.title}
                  </div>
                  <div class="priceItem">
                    ${product.price.toLocaleString('de-DE')}Đ
                  </div>
              </div>
            </a>
          `
      countBestSell++;
      listItemBestSell[indexBestSell].appendChild(bestSellProduct);
      if (countBestSell === 4) {
        indexBestSell++;
        countBestSell = 1;
      }
    })
  })
  .catch(err => {
    console.log(err);
  })

//   //############################################################################

const listItemNews = document.querySelectorAll(".list-item-news");
let indexNews = 0, countNews = 1;

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
      newProduct.innerHTML = `
          <a href="products/details/${product.id}">
          <img src="${product.thumbnail}">
          <div class="item-text">
              <div class="nameItem">
                ${product.title}
              </div>
              <div class="priceItem">
                ${product.price.toLocaleString()}Đ
              </div>
          </div>
        </a>
          `
      countNews++;
      listItemNews[indexNews].appendChild(newProduct);
      if (countNews === 4) {
        indexNews++;
        countNews = 0;
      }
    })
  })
  .catch(err => {
    console.log(err);
  }) 