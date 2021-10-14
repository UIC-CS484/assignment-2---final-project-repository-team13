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

require('./routes/accountRoute')(app)
require('./routes/authRoutes')(app)

app.get('/', async (req, res) => {
    res.status(200).send('Hello world')
})

const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
})