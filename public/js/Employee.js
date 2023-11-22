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


