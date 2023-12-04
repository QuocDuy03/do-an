const searchParams = new URLSearchParams(window.location.search);
const keyword = searchParams.get('query');

document.querySelector('.products span').textContent = keyword;

fetch(`/search-keyword?query=${encodeURIComponent(keyword)}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Fetch request failed');
        }
        return response.json();
    })
    .then((data) => {
        displayProducts(data.products);
    })

function displayProducts(products) {
    products.forEach((product) => {
        const productItem = document.createElement('li');
        productItem.classList.add('box');
        productItem.innerHTML = `
            <a href="products/details/${product.id}">
              <img src="${product.thumbnail}">
              <div class="item-text">
                  <div class="nameItem">
                    ${product.title}
                  </div>
                  <div class="priceItem">
                    ${product.price.toLocaleString('de-DE')} Đ
                  </div>
              </div>
            </a>
          `
        document.querySelector('.box-container').appendChild(productItem);
    })
}

