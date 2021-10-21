document.querySelector('#btn').addEventListener('click', (e) => {

    e.preventDefault();

    if (document.getElementById('pass').value == document.getElementById('repass').value) {

        let loginCredentials = {
            email: document.getElementById('user').value,
            password: document.getElementById('pass').value
        }

        fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginCredentials),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
                document.getElementById('errorMessage').innerHTML = 'Try Again with Different Credentials!';
            });

    } else {
        document.getElementById('errorMessage').innerHTML = 'Password and Re-Enter Password Do Not Match!';
    }
});