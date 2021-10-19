const passport = require('passport')
const bcrypt = require('bcrypt')


const db = require('../services/database')

module.exports = app => {
    app.post('/api/signup', (req, res, next) => {
        let username = req.body.username
        let password = req.body.password

        const saltRound = 13
        const salt = bcrypt.genSaltSync(saltRound)
        const hashPass = bcrypt.hashSync(password, salt)

        db.run('INSERT INTO User (username, password) VALUES(?, ?)', [username, hashPass], (err) => {
            if (err) {
                return res.status(404).send({ success: false, error: err.message });
            }
            res.status(200).send({sucess: true})
        })
    })

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