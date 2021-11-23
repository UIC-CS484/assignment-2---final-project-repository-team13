const express = require('express')
const cookieSession = require('express-session')
const passport = require('passport')
const SQLiteStore = require('connect-sqlite3')(cookieSession)

require('./services/passport')
require('./services/database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cookieSession({
        secret: 'secretkey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            MaxAge: 1000 * 60 * 60 * 24
        },
        store: new SQLiteStore({
            table: 'sessions',
            db: './NexFlin.sqlite'
        }),
    })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'));

require('./routes/authRoutes')(app)
require('./routes/movieAPI')(app)
require('./routes/movieRoute')(app)
require('./routes/viewRoutes')(app)

const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
})
