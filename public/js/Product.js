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
            <td>${product.status}</td>
            <td>
                <div class="Action">
                    <span class="las la-edit edit-button" data-id="${product.id}"></span>
                    <span class="las la-trash delete-button" data-id="${product.id}"></span>
                </div>
            </td>
        `
            document.querySelector('table tbody').appendChild(tableRow);
        })
    })

const form = document.querySelector('#productForm');
const title = form.querySelector('#title');
const quantitySizeS = form.querySelector('#quantity-size-S');
const quantitySizeM = form.querySelector('#quantity-size-M');
const quantitySizeL = form.querySelector('#quantity-size-L');
const price = form.querySelector('#price');
const category = form.querySelector('#category');
const type = form.querySelector('#type');
const description = form.querySelector('#description');
const imageUpload = form.querySelector('#imageUpload');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('quantitySizeS', quantitySizeS.value);
    formData.append('quantitySizeM', quantitySizeM.value);
    formData.append('quantitySizeL', quantitySizeL.value);
    formData.append('price', price.value);
    formData.append('category', category.value);
    formData.append('type', type.value);
    formData.append('description', description.value);
    formData.append('imageFile', imageUpload.files[0]);

    try {
        const res = await fetch('/admin/products/addProduct', {
            method: 'POST',
            body: formData,
        });
        const db = await res.json();
        
        if (res.status === 200) {
            alert(db.message);
        }
        else {
            console.log("Đã có lỗi xảy ra")
        }
    }
    catch (error) {
        console.log(error);
    }


    
})
