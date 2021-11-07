const express = require('express')
const cookieSession = require('express-session')
const passport = require('passport')

require('./services/passport')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cookieSession({
        secret: 'secretkey',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'));

require('./routes/authRoutes')(app)
require('./routes/viewRoutes')(app)

const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
})
