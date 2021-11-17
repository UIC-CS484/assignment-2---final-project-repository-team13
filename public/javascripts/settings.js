let user;

fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        user = data;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

function goBack() {
    location.href = '/account';
}

document.querySelector('#passBtn').addEventListener('click', (e) => {

    e.preventDefault();

    let newCredentials = {
        email: user.email,
        password: document.getElementById('newpass').value,
    }

    fetch('http://localhost:3000/api/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCredentials),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('message').innerHTML = 'Password has changed!';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.querySelector('#deleteBtn').addEventListener('click', (e) => {

    e.preventDefault();

    let credentials = {
        email: user.email,
    }

    fetch('http://localhost:3000/api/account', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            location.href = '/api/logout'
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});