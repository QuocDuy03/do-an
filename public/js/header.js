let searchBar = document.querySelector('.header .navbar-wrap .search-bar');
let navbar = document.querySelector('.navbar');
let profile = document.querySelector('.profile-details');
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