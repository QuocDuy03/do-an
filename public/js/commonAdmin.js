let profile = document.querySelector('.profile-details');
document.querySelector("#user-btn").onclick = () => {
    profile.classList.toggle("active");
}

let logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', () => {
    fetch('/logout', { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout request failed');
            }
            return response.json();
        })
        .then(() => {
            loggedOut.style.display = 'block';
            loggedIn.style.display = 'none';
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
});

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
        let h2Element = document.querySelector(".profile-details h2");
        h2Element.textContent = "Xin chào, " + userData.name;
    })