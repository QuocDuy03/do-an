let searchBar = document.querySelector('.header .navbar-wrap .search-bar');
let navbar = document.querySelector('.navbar');
let profile = document.querySelector('.profile-details');
let loggedOut = document.querySelector('.logged-out');
let loggedIn = document.querySelector('.logged-in');
let logoutBtn = document.querySelector('.logout');


document.querySelector("#search-btn").onclick = () => {
    searchBar.classList.toggle("active");
    navbar.classList.remove("active");
    profile.classList.remove("active");
}

document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle('active');
    searchBar.classList.remove("active");
    profile.classList.remove("active");
}

document.querySelector("#user-btn").onclick = () => {
    profile.classList.toggle("active");
    navbar.classList.remove("active");
    searchBar.classList.remove("active");
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
        let h2Element = document.querySelector(".profile-details .logged-in h2");
        h2Element.textContent = "Xin chào, " + userData.name;
        loggedOut.style.display = 'none';
        loggedIn.style.display = 'block';
    })

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
