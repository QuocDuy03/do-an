// Tạo hiệu ứng chuyển mượt đến phần áo hoặc quần 
document.addEventListener("DOMContentLoaded", function () {
 
    var aoLink = document.querySelector('.danhmuc ul li:nth-child(1) a');
    var quanLink = document.querySelector('.danhmuc ul li:nth-child(2) a');
    var aoSection = document.querySelector('.listItem-container.shirt');
    var quanSection = document.querySelector('.listItem-container.trousers');
  
    
    aoLink.addEventListener("click", function (event) {
        event.preventDefault(); 
        scrollSmoothly(aoSection);
    });
  
  
    quanLink.addEventListener("click", function (event) {
        event.preventDefault();
        scrollSmoothly(quanSection);
    });
  
  
    function scrollSmoothly(element) {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop 
        });
    }
  });
  

  //############################################################################
  fetch('/products/showMaleShirts', {
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

        // let divCount = data.products.length/3;
        // let roundedDivCount = Math.ceil(divCount);
        // console.log(roundedDivCount);
        let divCount = data.products.length;

        for (i=0; i<divCount; i=i+3){
            const shirtsDiv = document.createElement('div');
            shirtsDiv.className = 'row';
            const shirts_ul = document.createElement('ul');
            shirtsDiv.className = 'listItem';
            for (j=i; j<i+3 && j<divCount; j++){
                const shirts_li = document.createElement('li');
                shirts_li.innerHTML = `
                    <a href="/products/details/${data.products[j].id}">
                        <div class="Item-container">
                            <div class="imgItem">
                                <img src="${data.products[j].thumbnail}">
                            </div>
                            <div class="nameItem">
                                ${data.products[j].title}
                            </div>
                            <div class="priceItem">
                                ${data.products[j].price.toLocaleString('de-DE')}Đ
                            </div>
                        </div>
                    </a>
                `
                shirts_ul.appendChild(shirts_li);
            }
            shirtsDiv.appendChild(shirts_ul);
            document.getElementById('shirts-div').appendChild(shirtsDiv);
        }
    })
    .catch(err => {
        console.log(err);
    })     
//############################################################################
fetch('/products/showMaleTrousers', {
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

    // let divCount = data.products.length/3;
    // let roundedDivCount = Math.ceil(divCount);
    // console.log(roundedDivCount);
    let divCount = data.products.length;

    for (i=0; i<divCount; i=i+3){
        const trousersDiv = document.createElement('div');
        trousersDiv.className = 'row';
        const shirts_ul = document.createElement('ul');
        trousersDiv.className = 'listItem';
        for (j=i; j<i+3 && j<divCount; j++){
            const shirts_li = document.createElement('li');
            shirts_li.innerHTML = `
                <a href="/products/details/${data.products[j].id}">
                    <div class="Item-container">
                        <div class="imgItem">
                            <img src="${data.products[j].thumbnail}">
                        </div>
                        <div class="nameItem">
                            ${data.products[j].title}
                        </div>
                        <div class="priceItem">
                            ${data.products[j].price.toLocaleString('de-DE')}Đ
                        </div>
                    </div>
                </a>
            `
            shirts_ul.appendChild(shirts_li);
        }
        trousersDiv.appendChild(shirts_ul);
        document.getElementById('trousers-div').appendChild(trousersDiv);
    }
})
.catch(err => {
    console.log(err);
})         