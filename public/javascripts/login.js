document.querySelector('#btn').addEventListener('click', (e) => {

    e.preventDefault();

    let loginCredentials = {
        email: document.getElementById('user').value,
        password: document.getElementById('pass').value
    }

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success == false) {
                document.getElementById('errorMessage').innerHTML = 'Invalid Email or Password!';
            } else {
                location.href = '/account'
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});