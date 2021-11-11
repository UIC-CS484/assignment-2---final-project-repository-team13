const requireLogin = require('./requireLogin')
const ifNotLoggedIn = require('./ifNotLoggedIn');
const path = require('path')

module.exports = app => {
    app.get('/', ifNotLoggedIn, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
    })

    app.get('/login', ifNotLoggedIn, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/login.html'))
    });

    app.get('/signup', ifNotLoggedIn, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/createAccount.html'))
    })

    app.get('/account', requireLogin, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/account.html'))
    })

    app.use((req, res) => {
        res.status(404).sendFile(path.join(__dirname, '../views/404.html'))
    })
}
