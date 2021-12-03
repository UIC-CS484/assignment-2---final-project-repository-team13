let user;

fetch('/user')
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

    fetch('/api/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCredentials),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success == false && data.error == 'password is not strong enough') {
                document.getElementById('errorMessage').innerHTML = 'Password Must Be At Least 8 Characters!';
                document.getElementById('message').innerHTML = '';
            } else if (data.success == false && data.error == 'password is easy to guess') {
                document.getElementById('errorMessage').innerHTML = 'Password Cannot Match Email!';
                document.getElementById('message').innerHTML = '';
            } else if (data.success == false && data.error == 'restricted password') {
                document.getElementById('errorMessage').innerHTML = 'This Password is Restricted!';
                document.getElementById('message').innerHTML = '';
            } else if (data.success == false && data.error == 'password need to have alphabet letters') {
                document.getElementById('errorMessage').innerHTML = 'Password Must Include Character!';
                document.getElementById('message').innerHTML = '';
            } else if (data.success == true) {
                document.getElementById('message').innerHTML = 'Password has changed!';
                document.getElementById('errorMessage').innerHTML = '';
            }
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

    fetch('/api/account', {
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