const token = sessionStorage.getItem("token");
let div = document.getElementById("users-div");

fetch('/api/users/' + token, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    },
}).then((response) => response.json())
    .then((data) => {
        if (data.statusCode) {
            div.textContent = "Access Denied!!";
        } else {
            const user = data;

            setUserDiv(user.username, user.fullname, user.idCard,
                user.faculty, user.phoneNumber, user.birthday, false);
        }
    });