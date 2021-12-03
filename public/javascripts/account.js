let watchedMovies;
let likedMovies;
let watchedPage = 1;
let likedPage = 1;

fetch('/user')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('name').innerHTML = 'Welcome, ' + data.first_name + "!";
    })
    .catch((error) => {
        console.error('Error:', error);
});

fetch('/api/watch')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        watchedMovies = data;
        let movieItems = "";
        let index = 0;
        let count = 0;
        while (index < watchedMovies.length && count != 5) {
            let imagelink = 'https://image.tmdb.org/t/p/w500' + watchedMovies[index].image;
            movieItems = movieItems + "<div class='movieItem'><img class='moviePoster' src="+imagelink+" alt='MoviePoster'><p>"+watchedMovies[index].name+"</p></div>";
            index++;
            count++;
        }
        document.getElementById('watchedMovies').innerHTML = movieItems;
    })
    .catch((error) => {
        console.error('Error:', error);
});

fetch('/api/like')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        likedMovies = data;
        let movieItems = "";
        let index = 0;
        let count = 0;
        while (index < likedMovies.length && count != 5) {
            let imagelink = 'https://image.tmdb.org/t/p/w500' + likedMovies[index].image;
            movieItems = movieItems + "<div class='movieItem'><img class='moviePoster' src="+imagelink+" alt='MoviePoster'><p>"+likedMovies[index].name+"</p></div>";
            index++;
            count++;
        }
        document.getElementById('likedMovies').innerHTML = movieItems;
    })
    .catch((error) => {
        console.error('Error:', error);
});

function moveToPrevPage(type) {
    if (type == 'watched') {
        document.getElementById('moveNextWatched').innerHTML = `<img src="/resources/Next.png" alt="Next">`;
        if (watchedPage == 1) {
            document.getElementById('movePrevWatched').innerHTML = "";
        } else {
            watchedPage = watchedPage - 1;
            if (watchedPage == 1) {
                document.getElementById('movePrevWatched').innerHTML = "";
            }
            loadPage('watched');
        }
    } else if (type == 'liked') {
        document.getElementById('moveNextLiked').innerHTML = `<img src="/resources/Next.png" alt="Next">`;
        if (likedPage == 1) {
            document.getElementById('movePrevLiked').innerHTML = "";
        } else {
            likedPage = likedPage - 1;
            if (likedPage == 1) {
                document.getElementById('movePrevLiked').innerHTML = "";
            }
            loadPage('liked');
        }
    }
}

function moveToNextPage(type) {
    if (type == 'watched') {
        document.getElementById('movePrevWatched').innerHTML = `<img src="/resources/Previous.png" alt="Next">`;
        watchedPage = watchedPage + 1;
        if (watchedPage * 5 > watchedMovies.length - 1) {
            document.getElementById('moveNextWatched').innerHTML = '';
        }
        loadPage('watched');
    } else if (type == 'liked') {
        document.getElementById('movePrevLiked').innerHTML = `<img src="/resources/Previous.png" alt="Next">`;
        likedPage = likedPage + 1;
        if (likedPage * 5 > likedMovies.length - 1) {
            document.getElementById('moveNextLiked').innerHTML = '';
        }
        loadPage('liked');
    }
}

function loadPage(type) {
    if (type == 'watched') {
        let movieItems = "";
        let index = (watchedPage - 1) * 5;
        let count = 0;
        while (index < watchedMovies.length && count != 5) {
            let imagelink = 'https://image.tmdb.org/t/p/w500' + watchedMovies[index].image;
            movieItems = movieItems + "<div class='movieItem'><img class='moviePoster' src="+imagelink+" alt='MoviePoster'><p>"+watchedMovies[index].name+"</p></div>";
            index++;
            count++;
        }
        document.getElementById('watchedMovies').innerHTML = movieItems;
    } else if (type == 'liked') {
        let movieItems = "";
        let index = (likedPage - 1) * 5;
        let count = 0;
        while (index < likedMovies.length && count != 5) {
            let imagelink = 'https://image.tmdb.org/t/p/w500' + likedMovies[index].image;
            movieItems = movieItems + "<div class='movieItem'><img class='moviePoster' src="+imagelink+" alt='MoviePoster'><p>"+likedMovies[index].name+"</p></div>";
            index++;
            count++;
        }
        document.getElementById('likedMovies').innerHTML = movieItems;
    }
}

function goBack() {
    location.href = '/account';
}