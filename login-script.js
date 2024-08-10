document.addEventListener('DOMContentLoaded', function() {
    const login_form = document.getElementById('login-form');
    const message = document.getElementById('message');

    const api_url = "https://qlw1kbyojd.execute-api.ap-south-1.amazonaws.com/prod"; // Add your API URL here

    login_form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch(`${api_url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const body = JSON.parse(data.body);

            console.log(body.login_successful);
            console.log(body.message);
            if (body.login_successful) {
                message.textContent = 'Login successful!';
                message.style.color = 'green';
            } else {
                message.textContent = body.message;
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = 'red';
        });
    });
});
