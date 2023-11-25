let form = document.querySelector('form');
let fullname = form.querySelector('#fullname');
let email = form.querySelector('#email');
let phoneNumber = form.querySelector('#phone_number');
let address = form.querySelector('#address');
let oldPassword = form.querySelector('#old-pass');
let newPassword = form.querySelector('#new-pass');
let confirmNewPassword = form.querySelector('#confirm-new-pass');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
let id;

fetch('/admin/dashboard/getProfile', {
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
    .then((userData) => {
        id = userData.id;
        fullname.value = userData.name;
        email.value = userData.email;
        phoneNumber.value = userData.phone;
        address.value = userData.address;
    })

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        if (newPassword.value !== confirmNewPassword.value) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Mật khẩu không khớp';
            return;
        } else {
            errorMessage.style.display = 'none';
        }

        const res = await fetch('/admin/dashboard/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
                confirmNewPassword: confirmNewPassword.value,
            }),
        });
        const data = await res.json();

        if (res.status === 400 || res.status === 401) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;
            return;
        } else {
            console.log("Change password successfully");
            successMessage.style.display = 'block';
            successMessage.textContent = 'Sửa thành công';
        }
    }
    catch (err) {
        console.log(err);
    }
})