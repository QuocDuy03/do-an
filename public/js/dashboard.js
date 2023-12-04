fetch('/admin/dashboard/countCustomers', {
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
        document.querySelector('#quantityCustomers').textContent = data.quantity;
    })
    .catch(err => {
        console.log(err);
    })

fetch('/admin/dashboard/countEmployees', {
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
        document.querySelector('#quantityEmployees').textContent = data.quantity;
    })
    .catch(err => {
        console.log(err);
    })

fetch('/admin/dashboard/countProducts', {
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
        document.querySelector('#quantityProducts').textContent = data.quantity;
    })
    .catch(err => {
        console.log(err);
    })