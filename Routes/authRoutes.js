const passport = require('passport')

module.exports = app => {
    app.post('/api/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/account',
            failureRedirect: '/'
        })(req, res, next)
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
}