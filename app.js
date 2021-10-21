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

app.use(express.static('public'));

app.get('/', async (req, res) => {
    res.status(200).sendFile('./views/index.html', {root: __dirname})
})

app.get('/login', async (req, res) => {
    res.status(200).sendFile('./views/login.html', {root: __dirname})
});

app.get('/signup', async (req, res) => {
    res.status(200).sendFile('./views/createAccount.html', {root: __dirname})
})

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname})
})

const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
})
