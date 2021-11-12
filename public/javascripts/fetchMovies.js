let movies; // Will Hold the one page of movies at a time
let pageNum = 1;
let whichFetch;

whichDoc();
whichFetch();

function whichDoc() {
    var fileName = location.pathname.split("/").slice(-1);
    console.log(fileName);
    if (fileName == 'trending') {
        whichFetch = () => {getTrendingMovies();};
    } else if (fileName == 'now_playing') {
        whichFetch = () => {getNowPlayingMovies();};
    }
}

function goBack() {
    location.href = '/account';
}

function getTrendingMovies() {
fetch('http://localhost:3000/movie/trending?page=' + pageNum)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            data[i].rank = ((pageNum-1)*20) + i + 1;
        }
        movies = data;
        let tableRows = '';
        for (let i = 0; i < movies.length; i++) {
            tableRows = tableRows + '<tr> <td>' + data[i].rank + '</td> <td>' + data[i].title + '</td> <td>' + data[i].vote_average + '</td> <td>' + data[i].vote_count + '</td> </tr>';
        }
        document.getElementById('tableBody').innerHTML = tableRows;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function getNowPlayingMovies() {
    fetch('http://localhost:3000/movie/now_playing?page=' + pageNum)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                data[i].rank = ((pageNum-1)*20) + i + 1;
            }
            movies = data;
            let tableRows = '';
            for (let i = 0; i < movies.length; i++) {
                tableRows = tableRows + '<tr> <td>' + data[i].rank + '</td> <td>' + data[i].title + '</td> <td>' + data[i].vote_average + '</td> <td>' + data[i].vote_count + '</td> </tr>';
            }
            document.getElementById('tableBody').innerHTML = tableRows;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


function moveToPrevPage() {
    if (pageNum == 1) {
        document.getElementById('movePrev').innerHTML = "";
    } else {
        pageNum = pageNum - 1;
        if (pageNum == 1) {
            document.getElementById('movePrev').innerHTML = "";
        }
        whichFetch();
    }
}

function moveToNextPage() {
    document.getElementById('movePrev').innerHTML = "&larr;";
    pageNum = pageNum + 1;
    whichFetch();
}

// Rank is in ascending order to begin with everything else is possibly unordered, so rankAsc = true and everything else is false
let rankAsc = true;
let titleAsc = false;
let ratingAsc = false;
let numRateAsc = false;

function resetTableHeaders() {
    rankAsc = false;
    titleAsc = false; 
    ratingAsc = false;
    numRateAsc = false;
    document.getElementById('rank').innerHTML = 'Rank ▲▼';
    document.getElementById('title').innerHTML = 'Title ▲▼';
    document.getElementById('rating').innerHTML = 'Rating ▲▼';
    document.getElementById('numOfRate').innerHTML = 'Number of Ratings ▲▼';
}

function sortByRank() {
    let tableRows = '';
    let curRank;
    let index;
    let temp;
    if (rankAsc) {
        for (let i = 0; i < movies.length; i++) {
            curRank = movies[i].rank;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curRank < movies[j].rank) {
                    curRank = movies[j].rank;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            document.getElementById('rank').innerHTML = 'Rank ▼';
        }
    } else {
        for (let i = 0; i < movies.length; i++) {
            curRank = movies[i].rank;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curRank > movies[j].rank) {
                    curRank = movies[j].rank;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            rankAsc = true;
            document.getElementById('rank').innerHTML = 'Rank ▲';
        }
    }
    document.getElementById('tableBody').innerHTML = tableRows;
};

function sortByTitle() {
    let tableRows = '';
    let curTitle;
    let index;
    let temp;
    if (titleAsc) {
        for (let i = 0; i < movies.length; i++) {
            curTitle = movies[i].title;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curTitle < movies[j].title) {
                    curTitle = movies[j].title;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            document.getElementById('title').innerHTML = 'Title ▼';
        }
    } else {
        for (let i = 0; i < movies.length; i++) {
            curTitle = movies[i].title;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curTitle > movies[j].title) {
                    curTitle = movies[j].title;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            titleAsc = true;
            document.getElementById('title').innerHTML = 'Title ▲';
        }
    }
    document.getElementById('tableBody').innerHTML = tableRows;
};

function sortByRating() {
    let tableRows = '';
    let curRating;
    let index;
    let temp;
    if (!ratingAsc) {
        for (let i = 0; i < movies.length; i++) {
            curRating = movies[i].vote_average;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curRating < movies[j].vote_average) {
                    curRating = movies[j].vote_average;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            ratingAsc = true;
            document.getElementById('rating').innerHTML = 'Rating ▲';
        }
    } else {
        for (let i = 0; i < movies.length; i++) {
            curRating = movies[i].vote_average;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curRating > movies[j].vote_average) {
                    curRating = movies[j].vote_average;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            document.getElementById('rating').innerHTML = 'Rating ▼';
        }
    }
    document.getElementById('tableBody').innerHTML = tableRows;
};

function sortByNumOfRate() {
    let tableRows = '';
    let curNumRate;
    let index;
    let temp;
    if (!numRateAsc) {
        for (let i = 0; i < movies.length; i++) {
            curNumRate = movies[i].vote_count;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curNumRate < movies[j].vote_count) {
                    curNumRate = movies[j].vote_count;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            numRateAsc = true;
            document.getElementById('numOfRate').innerHTML = 'Number of Ratings ▲';
        }
    } else {
        for (let i = 0; i < movies.length; i++) {
            curNumRate = movies[i].vote_count;
            index = i;
            for (let j = i; j < movies.length; j++) {
                if (curNumRate > movies[j].vote_count) {
                    curNumRate = movies[j].vote_count;
                    index = j;
                }
            }
            temp = movies[i];
            movies[i] = movies[index];
            movies[index] = temp;
            tableRows = tableRows + '<tr> <td>' + movies[i].rank + '</td> <td>' + movies[i].title + '</td> <td>' + movies[i].vote_average + '</td> <td>' + movies[i].vote_count + '</td> </tr>';
            resetTableHeaders();
            document.getElementById('numOfRate').innerHTML = 'Number of Ratings ▼';
        }
    }
    document.getElementById('tableBody').innerHTML = tableRows;
};