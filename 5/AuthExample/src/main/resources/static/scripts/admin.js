const token = sessionStorage.getItem("token");
let div = document.getElementById("users-div");

fetch('/api/users?' + new URLSearchParams({
    role: 'ROLE_USER'
}), {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }
}).then((response) => response.json())
    .then((data) => {
        if (data.statusCode) {
            div.textContent = "Access Denied!!";
        } else {
            const users = data;

            for (const user of users) {
                setUserDiv(user.username, user.fullname, user.idCard,
                    user.faculty, user.phoneNumber, user.birthday, true);
            }
        }
    });