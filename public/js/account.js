const form = document.querySelector('#change-information');
const userName = document.querySelector('#fullname');
const userEmail = document.querySelector('#user-email');
const userPhone = document.querySelector('#phone-number');
const userAddress = document.querySelector('#address');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
let id;
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
        userName.value = userData.name;
        userEmail.value = userData.email;
        userPhone.value = userData.phone;
        userAddress.value = userData.address;
    })

function activeEditInformation() {
    userName.removeAttribute('readonly');
    userEmail.removeAttribute('readonly')
    userPhone.removeAttribute('readonly')
    userAddress.removeAttribute('readonly')
    document.getElementsByClassName('edit-btn')[0].classList.add('hidden');
    document.getElementsByClassName('confirm-btn')[0].classList.remove('hidden');
    document.getElementsByClassName('cancel-btn')[0].classList.remove('hidden');
}

function inactiveEditInformation() {
    userName.setAttribute('readonly', true);
    userEmail.setAttribute('readonly', true)
    userPhone.setAttribute('readonly', true)
    userAddress.setAttribute('readonly', true)
    document.getElementsByClassName('edit-btn')[0].classList.remove('hidden');
    document.getElementsByClassName('confirm-btn')[0].classList.add('hidden');
    document.getElementsByClassName('cancel-btn')[0].classList.add('hidden');
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('/edit/change-information', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: id,
                userName: userName.value,
                userPhone: userPhone.value,
                userEmail: userEmail.value,
                userAddress: userAddress.value,
            }),
        });
        const data = await res.json();

        if (res.status === 400 || res.status === 401) {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            errorMessage.textContent = data.message;
            return;
        } else {
            console.log("Change information successfully");
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
            successMessage.textContent = 'Sửa thành công';
            inactiveEditInformation()
        }
    }
    catch (err) {
        console.log(err);
    }
})