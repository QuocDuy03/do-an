let searchBar = document.querySelector('.header .navbar-wrap .search-bar');
let navbar = document.querySelector('.navbar');
document.querySelector("#search-btn").onclick = () => {
    searchBar.classList.toggle("active");
    navbar.classList.remove("active");
}


document.querySelector("#menu-btn").onclick = () => {
    navbar.classList.toggle('active');
    searchBar.classList.remove("active");
}