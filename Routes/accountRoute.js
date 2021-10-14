const requireLogin = require('./requireLogin')

module.exports = app => {
    app.get('/account', requireLogin, async (req, res) => {
        res.status(200).send('sign in successful')
    })
}
