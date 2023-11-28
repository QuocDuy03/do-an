// Display when click
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function submitForm() {
    var form = document.getElementById("employeeForm");
    var formData = new FormData(form);

    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    // Add your desired logic to handle the form data here

    closePopup();
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Function for open admin infor
function showAdminInfo() {
    var info = document.getElementById("info");
    if (info.style.display === "none") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}

fetch('/admin/employees/getEmployees', {
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
        data.employees.forEach(employee => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
            <td>
                <input type="checkbox" id="tick${employee.id}" name="tick${employee.id}" value="${employee.id}">
                <label for="tick${employee.id}" class="tick-checkbox"></label>
            </td>
            <td>${employee.id}</td>
            <td>${employee.fullname}</td>
            <td>${employee.email}</td>
            <td>${employee.phone_number}</td>
            <td>${employee.address}</td>
            <td>${employee.name}</td>
            <td>
                <div class="Action">
                    <span class="las la-edit edit-botton"></span>
                    <span class="las la-trash delete-button"></span>
                </div>
            </td>
        `
            document.querySelector('table tbody').appendChild(tableRow);
        })
    })
    .catch(err => {
        console.log(err);
    }) 