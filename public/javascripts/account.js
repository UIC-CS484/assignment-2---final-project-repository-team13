fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('name').innerHTML = 'Welcome, ' + data.first_name + "!";
    })
    .catch((error) => {
        console.error('Error:', error);
    });

function goBack() {
    location.href = '/account';
}