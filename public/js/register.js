function validateEmail(email) {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

const form = document.querySelector('.register');
const fullname = document.querySelector('#fullname');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email-register');
const address = document.querySelector('#address');
const pass = document.querySelector('#pass');
const cpass = document.querySelector('#cpass');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

function displayError(message) {
    successMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}


function checkPasswordStrength(password) {
    if (password.length < 8) {
        displayError('Mật khẩu quá ngắn. Hãy nhập ít nhất 8 ký tự.')
        return false;
    }

    // Kiểm tra có ít nhất một chữ cái viết thường
    if (!/[a-z]/.test(password)) {
        displayError('Mật khẩu cần ít nhất một chữ cái viết thường.');
        return false;
    }

    // Kiểm tra có ít nhất một chữ cái viết hoa
    if (!/[A-Z]/.test(password)) {
        displayError('Mật khẩu cần ít nhất một chữ cái viết hoa.');
        return false;
    }

    // Kiểm tra có ít nhất một số
    if (!/\d/.test(password)) {
        displayError('Mật khẩu cần ít nhất một số.');
        return false;
    }
    return true;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {

        if (!validateEmail(email.value)) {
            displayError('Sai định dạng email.');
            return;
        } else {
            errorMessage.style.display = 'none';
        }

        if (pass.value !== cpass.value) {
            displayError('Mật khẩu không khớp.')
            return;
        } else {
            errorMessage.style.display = 'none';
        }

        if (!checkPasswordStrength(pass.value)) 
            return;

        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullname.value,
                phone: phone.value,
                email: email.value,
                address: address.value,
                pass: pass.value,
                cpass: cpass.value,
            })
        },)

        const data = await res.json();
        console.log(data);

        if (res.status === 400 || res.status === 401) {
            successMessage.style.display = 'none';
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;
            return;
        }
        else {
            console.log('Register completed');
            errorMessage.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.textContent = 'Đăng ký thành công. 3 giây nữa sẽ tự động chuyển sang trang đăng nhập.';
            setTimeout(function () {
                window.location.href = '/login'; // Thay đổi URL thành trang đăng nhập của bạn
            }, 3000);
        }
    }
    catch (err) {
        console.log(err);
    }
})