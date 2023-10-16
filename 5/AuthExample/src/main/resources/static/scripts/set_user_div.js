function setUserDiv(username, fullname, idCard, faculty, phoneNumber, birthday, toDeleteUser) {
    let usersDiv = document.getElementById("users-div");

    let userDiv = document.createElement("div");
    userDiv.classList.add('user-div');

    let usernameParagraph = document.createElement("p");
    usernameParagraph.textContent = "Username: " + username;
    usernameParagraph.id = "username";
    usernameParagraph.classList.add("userinfo");

    let fullnameInput = document.createElement("input");
    fullnameInput.value = fullname;
    fullnameInput.placeholder = "Fullname";
    fullnameInput.id = "fullname";
    fullnameInput.classList.add("userinfo");

    let idCardInput = document.createElement("input");
    idCardInput.value = idCard;
    idCardInput.placeholder = "ID Card";
    idCardInput.id = "id_card";
    idCardInput.classList.add("userinfo");

    let facultyInput = document.createElement("input");
    facultyInput.value = faculty;
    facultyInput.placeholder = "Faculty";
    facultyInput.id = "faculty";
    facultyInput.classList.add("userinfo");

    let phoneInput = document.createElement("input");
    phoneInput.value = phoneNumber;
    phoneInput.placeholder = "Phone Number";
    phoneInput.id = "phone_number";
    phoneInput.classList.add("userinfo");

    let birthdayInput = document.createElement("input");
    birthdayInput.type = "date";
    birthdayInput.value = birthday;
    birthdayInput.placeholder = "Birthday";
    birthdayInput.id = "birthday";
    birthdayInput.classList.add("userinfo");

    let error_div = document.createElement("div");
    error_div.id = "error-message";
    error_div.classList.add("userinfo");

    let edit_button = document.createElement("button");
    edit_button.textContent = "Edit";
    edit_button.addEventListener('click', () => {
        if (validateUserinfo(fullnameInput.value, facultyInput.value, idCardInput.value,
            phoneInput.value, birthdayInput.value, error_div)) {
            const token = sessionStorage.getItem("token");

            const params = JSON.stringify({
                username: username,
                fullname: fullnameInput.value,
                idCard: idCardInput.value,
                faculty: facultyInput.value,
                phoneNumber: phoneInput.value,
                birthday: birthdayInput.value
            });

            fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: params
            }).then((response) => response.status)
                .then((statusCode) => {
                    if (statusCode < 400)
                        alert("User is Edited!!!");
                });
        }
    });

    userDiv.appendChild(usernameParagraph);
    userDiv.appendChild(fullnameInput);
    userDiv.appendChild(idCardInput);
    userDiv.appendChild(facultyInput);
    userDiv.appendChild(phoneInput);
    userDiv.appendChild(birthdayInput);
    userDiv.appendChild(error_div);
    userDiv.appendChild(edit_button);

    if (toDeleteUser) {
        let delete_button = document.createElement("button");
        delete_button.textContent = "Delete";
        delete_button.addEventListener('click', () => {
            const token = sessionStorage.getItem("token");

            fetch('/api/users/' + username, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then((response) => response.status)
                .then((statusCode) => {
                    if (statusCode < 400) {
                        usersDiv.removeChild(userDiv);
                        alert("User is Deleted!!!");
                    }
                });
        });

        userDiv.appendChild(delete_button);
    }

    usersDiv.appendChild(userDiv);
}