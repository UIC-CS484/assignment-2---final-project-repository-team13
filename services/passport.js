const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const db = require('./database')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (username, password, done) {
        db.all(`SELECT * FROM User WHERE username = ?`, [username] , (err, rows) => {
            if (err) return done(err)
            if (rows.length == 0) return done(null, false, {message: 'Incorrect username'})
            if (rows[0].password != password) return done(null, false, {message: 'Incorrect password'})
            return done(null, rows[0])
        })
    }
))