document.addEventListener('DOMContentLoaded', function() {
    const login_form = document.getElementById('login-form');
    const register_form = document.getElementById('register-form');
    const message = document.getElementById('message');

    const api_url = "https://qlw1kbyojd.execute-api.ap-south-1.amazonaws.com/prod";

    login_form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;

        fetch(`${api_url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                message.textContent = 'User exists, you are logged in!';
                message.style.color = 'green';
            } else {
                message.textContent = 'User does not exist. Please register.';
                message.style.color = 'red';
                login_form.style.display = 'none';
                register_form.style.display = 'block';
                document.getElementById('register-username').value = username;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = 'red';
        });
    });

    register_form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        fetch(`${api_url}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => response.json())
        .then(data => {
            message.textContent = 'Registration successful! You can now log in.';
            message.style.color = 'green';
            register_form.style.display = 'none';
            login_form.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = 'red';
        });
    });
});

