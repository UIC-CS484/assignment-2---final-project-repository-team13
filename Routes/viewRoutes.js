const requireLogin = require('./requireLogin')
const path = require('path')

module.exports = app => {
    app.get('/', async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
    })

    app.get('/login', async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/login.html'))
    });

    app.get('/signup', async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '../views/createAccount.html'))
    })

    app.get('/account', requireLogin, async (req, res) => {
        res.status(200).send('sign in successful')
    })

    app.use((req, res) => {
        res.status(404).sendFile(path.join(__dirname, '../views/404.html'))
    })
}
