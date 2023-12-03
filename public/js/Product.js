// Display when click
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function submitForm() {
    var form = document.getElementById("employeeForm");
    var formData = new FormData(form);

    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    // Add your desired logic to handle the form data here

    closePopup();
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Function for open admin infor
function showAdminInfo() {
    var info = document.getElementById("info");
    if (info.style.display === "none") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}

fetch('/admin/products/getProducts', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}).then(response => {
    if (!response.ok) {
        throw new Error('Fetch request failed');
    }
    return response.json();
})
    .then((productsData) => {
        productsData.products.forEach(product => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
            <td>
                <input type="checkbox" id="tick${product.id}" name="tick${product.id}" value="${product.id}">
                <label for="tick${product.id}" class="tick-checkbox"></label>
            </td>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.name}</td>
            <td></td>
            <td>
                <div class="Action">
                    <span class="las la-edit edit-botton"></span>
                    <span class="las la-trash delete-button"></span>
                </div>
            </td>
        `
            document.querySelector('table tbody').appendChild(tableRow);
        })
    })

const form = document.querySelector('#productForm');
const title = form.querySelector('#title');
const quantity = form.querySelector('#quantity');
const price = form.querySelector('#price');
const category = form.querySelector('#category');
const description = form.querySelector('#description');
const imageUpload = form.querySelector('#imageUpload');

console.log(imageUpload.value)

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const res = fetch('/admin/products/addProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title.value,
            quantity: quantity.value,
            price: price.value,
            category: category.value,
            description: description.value,
            imageUpload: imageUpload.value,
        })
    })

})