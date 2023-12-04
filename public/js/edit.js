const form = document.querySelector('#change-password');
const oldPassword = form.querySelector("#old-pass")
const newPassword = form.querySelector("#new-pass")
const confirmNewPassword = form.querySelector("#confirm-new-pass")
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
let id;
function validateEmail(email) {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

fetch('/account/user-info', {
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

        const res = await fetch('/edit/change-password', {
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