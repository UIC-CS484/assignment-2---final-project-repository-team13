const passport = require('passport')
const bcrypt = require('bcrypt')

const saltRound = require('../config').saltRound
const db = require('../services/database')
const requireLogin = require('./requireLogin');

module.exports = app => {
    app.post('/api/signup', (req, res) => {
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let username = req.body.email
        let password = req.body.password

        const salt = bcrypt.genSaltSync(saltRound)
        const hashPass = bcrypt.hashSync(password, salt)

        db.run('INSERT INTO User (email, password, first_name, last_name) VALUES(?, ?, ?, ?)', [username, hashPass, firstname, lastname], (err) => {
            if (err) {
                return res.status(404).send({ success: false, error: err.message });
            }
            res.status(200).send({success: true})
        })
    })

    app.put('/api/password', requireLogin, (req, res) => {
        let username = req.body.email
        let newPassword = req.body.password

        const saltRound = saltRound
        const salt = bcrypt.genSaltSync(saltRound)
        const hashPass = bcrypt.hashSync(newPassword, salt)

        db.run('UPDATE User SET password = ? WHERE email = ?', [hashPass, username], (err) => {
            if (err) {
                return res.status(404).send({ success: false, error: err.message });
            }
            res.status(200).send({success: true})
        })
    })

    app.delete('/api/account', requireLogin, (req, res) => {
        let username = req.body.email

        db.run('DELETE from User WHERE email = ?', [username], (err) => {
            if (err) {
                return res.status(404).send({ success: false, error: err.message });
            }
            res.status(200).send({success: true})
        })
    })

    app.post('/api/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(404).send({success: false, error: 'User Not Found'})
            req.logIn(user, (err) => {
                if (err) return next(err)
                return res.status(200).send({success: true})
            })
        })(req, res, next)
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
}