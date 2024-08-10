document.addEventListener('DOMContentLoaded', function() {
    const register_form = document.getElementById('register-form');
    const message = document.getElementById('message');

    const api_url = "https://qlw1kbyojd.execute-api.ap-south-1.amazonaws.com/prod"; // Add your API URL here

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
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = 'red';
        });
    });
});
