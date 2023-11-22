
const form = document.querySelector('.login');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');

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
        console.log(data);

        if (res.status === 400 || res.status === 401) {
            console.log(data.message);
        } else {
            console.log("Login successful");
            window.location.href = '/';

        }
    } catch (err) {
        console.log(err);
    }
});
