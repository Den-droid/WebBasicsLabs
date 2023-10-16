let button = document.getElementById("enter-button");

button.addEventListener('click', (e) => {
    e.preventDefault();
    let username_input = document.getElementById("username");
    let password_input = document.getElementById("password");
    let error_div = document.getElementById("error-message");

    if (!validateLogin(username_input.value, password_input.value)) {
        error_div.textContent = "Wrong Format! Try again!";
    } else {
        let credentials = JSON.stringify({
            username: username_input.value,
            password: password_input.value
        });

        fetch('/api/auth/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: credentials
        })
            .then((response) => response.json())
            .then((data) => {
                const {accessToken, refreshToken} = data;
                if (accessToken) {
                    sessionStorage.setItem('token', accessToken);

                    let index_of_refresh_token = document.cookie.indexOf('refresh_token');
                    if (index_of_refresh_token !== -1) {
                        let valueIndex = index_of_refresh_token + 'refresh_token'.length + 1;
                        document.cookie = document.cookie.slice(0, valueIndex) +
                            encodeURIComponent(refreshToken) + ';' +
                            document.cookie.slice(valueIndex, document.cookie.length);
                    } else {
                        document.cookie += encodeURIComponent('refresh_token') +
                            "=" + encodeURIComponent(refreshToken) + ';';
                    }

                    window.location.href = window.location.origin + '/userinfo';
                } else {
                    error_div.textContent = "Wrong Login or Password!!!";
                }
            });
    }
});