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

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {

        if (!validateEmail(email.value)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Sai định dạng email';
            return; 
        } else {
            errorMessage.style.display = 'none';
        }

        if (pass.value!== cpass.value) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Mật khẩu không khớp';
            return;
        } else {
            errorMessage.style.display = 'none';
        }

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
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;
            return;
        }
        else {
            console.log('Register completed');
            successMessage.style.display = 'block';
            successMessage.textContent = 'Đăng ký thành công';
        }
    }
    catch (err) {
        console.log(err);
    }
})