const requireLogin = require('./requireLogin')
const db = require('../services/database')

function insertIntoAction(action, movieID, userId) {
    return new Promise((res, rej) => {
        db.run("INSERT INTO UserAction (userID, movieID, userAction) VALUES (?, ?, ?)", [userId, movieID, action], (err) => {
            if (err) {
                console.log(action , movieID, userId, err)
                return rej({ success: false, error: err.message });
            }
            res({success: true})
        }) 
    })
}

function insertIntoMovie(movie) {
    return new Promise((res, rej) => {
        db.run("INSERT INTO Movies (name, rating, image, release_date, description) VALUES (?, ?, ?, ?, ?)",
                    [movie.title, "0", movie.poster_path, movie.release_date, movie.overview], 
                    function (err) {

            if (err) {
                return rej([]);
            }

            res([{movieID: this.lastID}])
        }) 
    })
}

function getMovieIdByName(movie) {
    return new Promise((res, rej) => {
        db.all("SELECT Movies.movieID FROM Movies WHERE Movies.name = ?", [movie.title], (err, rows) => {
            if (err) {
                return rej([])
            }
            res(rows)
        }) 
    })
}

function getUserIdByName(email) {
    return new Promise((res, rej) => {
        db.all("SELECT userID FROM User WHERE email = ?", [email], (err, rows) => {
            if (err) {
                return rej([])
            }
            res(rows)
        }) 
    })
}

function getMovieByAction(userId, action) {
    return new Promise((res, rej) => {
        db.all("SELECT * FROM Movies WHERE movieID IN (SELECT movieID FROM UserAction WHERE userID = ? AND userAction = ?)", [userId, action], (err, rows) => {
            if (err) {
                return rej([])
            }
            res(rows)
        })
    })
}

function removeLikeFromMovie(userId, movieId) {
    return new Promise((res, rej) => {
        db.run("DELETE FROM UserAction WHERE userID = ? AND movieID = ?", [userId, movieId], (err) => {
            if (err) {
                return rej({ success: false, error: err.message });
            }
            res({success: true})
        })
    })
}

module.exports = app => {

    // Get User's Action toward Move
    app.get('/api/:action', requireLogin, async (req, res) => {
        const action = req.params.action
        const email = req.user.email

        let userId = undefined 

        // Get User Id
        try {
            let listUserId = await getUserIdByName(email)
            userId = listUserId[0]
        } catch (e) { console.log("get user id", e.message) }

        if (!userId) return res.status(404).send({status: false, message: `MovieID and UserId Not Found`})

        // Get List of movies according to user and user's action
        try {
            let result = await getMovieByAction(userId.userID, action)
            res.status(200).send(result)
        } catch (e) {
            console.log(e)
            res.status(404).send({status: false, message: e.message})
        }
    })

    // API For user to do action upon the movie
    app.post('/api/:action', requireLogin, async (req, res) => {
        const body = req.body
        const movie = body.movie
        const action = req.params.action
        const email = req.user.email
        
        if (action != "watch" && action != "like") return res.status(404).send({status: false, message: 'Action Not Supported'})
        if (!movie || !email) return res.status(404).send({status: false, message: `Body Is Missing`})

        let movieId = undefined
        let userId = undefined

        // Get Movie Id
        try {
            let listMovieId = await getMovieIdByName(movie)
            movieId = listMovieId[0]
        } catch (e) { console.log("get movie", e.message) }

        // Get User Id
        try {
            let listUserId = await getUserIdByName(email)
            userId = listUserId[0]
        } catch (e) { console.log("get user id", e.message) }

        if (!movieId) {
            // INSERT INTO MOVIES 
            try {
                let listMovieId = await insertIntoMovie(movie)
                movieId = listMovieId[0];
            } catch (e) { console.log("insert movie", e.message) }
        }

        if (!movieId || !userId) {
            return res.status(404).send({status: false, message: `MovieID and UserId Not Found`})
        }

        // Update Action
        try {
            let result = await insertIntoAction(action, movieId.movieID, userId.userID)
            res.status(200).send(result)
        } catch (e) {
            console.log(e)
            res.status(404).send({status: false, message: e.message})
        }
    })
    
    // API For user to remove like from film
    // Can't remove a movie already watched
    app.delete('/api/like', requireLogin, async (req, res) => {
        const action = 'like'
        const email = req.user.email
        const movie = req.body.movie

        if (!movie || !email) return res.status(404).send({status: false, message: `Body Is Missing`})

        let movieId = undefined
        let userId = undefined

        // Get Movie List
        try {
            let listMovieId = await getMovieIdByName(movie)
            movieId = listMovieId[0]
        } catch (e) { console.log("get movie", e.message) }

        // Get User Id
        try {
            let listUserId = await getUserIdByName(email)
            userId = listUserId[0]
        } catch (e) { console.log("get user id", e.message) }


        if (!movieId || !userId) {
            return res.status(404).send({status: false, message: `MovieID and UserId Not Found`})
        }

        // Remove Like
        try {
            let result = await removeLikeFromMovie(userId.userID, movieId.movieID)
            res.status(200).send(result)
        } catch (e) {
            console.log(e)
            res.status(404).send({status: false, message: e.message})
        }
    })
}