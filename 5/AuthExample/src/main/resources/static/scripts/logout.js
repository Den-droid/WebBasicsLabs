let logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener('click', () => {
    fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        }
    }).then((response) => response.status)
        .then((statusCode) => {
            if (statusCode < 300) {
                sessionStorage.removeItem('token');
                window.location.href = window.location.origin + '/login';
            }
        })
})