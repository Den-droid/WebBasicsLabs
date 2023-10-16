let button = document.getElementById("enter-button");

button.addEventListener('click', (e) => {
    e.preventDefault();
    let username_input = document.getElementById("username");
    let password_input = document.getElementById("password");
    let confirm_password_input = document.getElementById("confirm_password");
    let fullname_input = document.getElementById("fullname");
    let faculty_input = document.getElementById("faculty");
    let id_card_input = document.getElementById("id_card");
    let phone_number_input = document.getElementById("phone_number");
    let birthday_input = document.getElementById("birthday");
    let error_div = document.getElementById("error-message");

    if (validateSignup(username_input.value, password_input.value, confirm_password_input.value,
        fullname_input.value, faculty_input.value, id_card_input.value,
        phone_number_input.value, birthday_input.value, error_div)) {

        let userinfo = JSON.stringify({
            username: username_input.value,
            password: password_input.value,
            fullname: fullname_input.value,
            idCard: id_card_input.value,
            faculty: faculty_input.value,
            phoneNumber: phone_number_input.value,
            birthday: birthday_input.value
        });

        try {
            fetch('/api/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userinfo
            }).then((response) => response.text())
                .then((data) => {
                    let response;
                    try {
                        response = JSON.parse(data);
                    } catch (e) {
                    }

                    if (!response) {
                        window.location.href = window.location.origin + '/login';
                    } else {
                        error_div.textContent = response.message;
                    }
                });
        } catch (e) {
        }
    }
});