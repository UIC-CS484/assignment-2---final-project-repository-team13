fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('name').innerHTML = 'Welcome, ' + data.first_name;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

fetch('http://localhost:3000/movie/trending')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let tableRows = '';
        for (let i = 0; i < 10; i++) {
            tableRows = tableRows + '<tr> <td>' + (i+1) + '</td> <td>' + data[i].title + '</td> <td>' + data[i].vote_average + '</td> <td>' + data[i].vote_count + '</td> </tr>';
        }
        document.getElementById('topTrendingTable').innerHTML = tableRows;
    })
    .catch((error) => {
        console.error('Error:', error);
    });