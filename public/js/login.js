
const form = document.querySelector('.login');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const errorMessage = document.getElementById('error-message');
const pathName = window.location.pathname;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                pass: pass.value,
            }),
        });
        const data = await res.json();
        if (res.status === 400 || res.status === 401 || res.status === 404){
            console.log(data.message);
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Tài khoản hoặc mật khẩu không chính xác!!!';
            return;
        } else {
            if (data.role_id === 2)
                window.location.href = '/';
            else 
                window.location.href = '/admin/dashboard';
        }
    } catch (err) {
        console.log(err);
    }
});
