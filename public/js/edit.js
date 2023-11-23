const form = document.querySelector('#change-information');
const userName = document.getElementById('username');
const userEmail = document.getElementById('change-email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
let id;
function validateEmail(email) {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

fetch('/login/user-info', {
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
        userName.value = userData.name;
        userEmail.value = userData.email;
    })

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        if (!validateEmail(userEmail.value)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Sai định dạng email';
            return; 
        } else {
            errorMessage.style.display = 'none';
        }

        if (password.value!== confirmPassword.value) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Mật khẩu không khớp';
            return;
        } else {
            errorMessage.style.display = 'none';
        }

        const res = await fetch('/edit/change-information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                name: userName.value,
                email: userEmail.value,
                pass: password.value,
                cpass: confirmPassword.value,
            }),
        });
        const data = await res.json();
        
        if (res.status === 400 || res.status === 401) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;
            return;
        } else {
            console.log("Edit successful");
            successMessage.style.display = 'block';
            successMessage.textContent = 'Sửa thành công';
        }
    }
    catch (err) {
        console.log(err);
    }
})