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

const searchForm = document.querySelector('.search-bar');
const currentPath = window.location.pathname;

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const keyword = document.querySelector('#keyword').value;
    if (keyword.trim() !== '') {
        try {
            const res = await fetch(`/search-keyword?query=${encodeURIComponent(keyword)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                const currentPath = window.location.pathname;
                const searchPath = `/search?query=${encodeURIComponent(keyword)}`;
                if (currentPath !== searchPath) {
                    window.location.href = searchPath;
                }
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
})


//############################################################################
fetch('/getNumberOfCartProduct', {
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
  .then(data => { 
    const cartProductNumber = document.querySelector('.icon sup');
    console.log(data.products[0].itemCount);
    cartProductNumber.textContent = data.products[0].itemCount;
  })
  .catch(err => {
      console.log(err);
  }) 
  
  
  
//   //========================================================================
//   function updateCartProductNumber() {
//     fetch('/getNumberOfCartProduct', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => {
//         if (!response.ok) { 
//             throw new Error('Fetch request failed');
//         }
//         return response.json();
//     })
//     .then(data => { 
//         const cartProductNumber = document.querySelector('.icon sup');
//         console.log(data.products[0].itemCount);
//         cartProductNumber.textContent = data.products[0].itemCount;
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

// // Thực hiện cập nhật mỗi 5 giây (5000 milliseconds)
// setInterval(updateCartProductNumber, 2000);
