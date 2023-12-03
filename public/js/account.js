const userName = document.querySelector('.user-name'); 
const userEmail = document.querySelector('.user-email');
const userPhone = document.querySelector('.user-phone');

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
        userName.textContent = userData.name;
        userEmail.textContent = userData.email;
        userPhone.textContent = userData.phone;
    })