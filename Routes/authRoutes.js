const passport = require('passport')
const bcrypt = require('bcrypt')

const saltRound = require('../config').saltRound
const db = require('../services/database')
const requireLogin = require('./requireLogin');
const ifNotLoggedIn = require('./ifNotLoggedIn');

let restrictedPasswordSet = new Set()
restrictedPasswordSet.add('12345678')
restrictedPasswordSet.add('qwerty12')
restrictedPasswordSet.add('asdfghjk')
restrictedPasswordSet.add('zxcvbnm')

let regex = /^\d+$/

module.exports = app => {
    app.post('/api/signup', ifNotLoggedIn, (req, res) => {
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let username = req.body.email
        let password = req.body.password

        if (password.length < 8) return res.status(404).send({success: false, error: 'password is not strong enough'})
        if (username == password) return res.status(404).send({success: false, error: 'password is easy to guess'})
        if (restrictedPasswordSet.has(password)) return res.status(404).send({success: false, error: 'restricted password'})
        if (regex.test(password)) return res.status(404).send({success: false, error: 'password need to have alphabet letters'})

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
        let username = req.user.email
        let newPassword = req.body.password

        if (newPassword.length < 8) return res.status(404).send({success: false, error: 'password is not strong enough'})
        if (username == newPassword) return res.status(404).send({success: false, error: 'password is easy to guess'})
        if (restrictedPasswordSet.has(newPassword)) return res.status(404).send({success: false, error: 'restricted password'})
        if (regex.test(restrictedPasswordSet)) return res.status(404).send({success: false, error: 'password need to have alphabet letters'})

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
        let username = req.user.email

        db.run('DELETE from User WHERE email = ?', [username], (err) => {
            if (err) {
                return res.status(404).send({ success: false, error: err.message });
            }
            res.status(200).send({success: true})
        })
    })

    app.post('/api/login', ifNotLoggedIn, (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(404).send({success: false, error: 'User Not Found'})
            req.logIn(user, (err) => {
                if (err) return next(err)
                return res.status(200).send({success: true})
            })
        })(req, res, next)
    })

    app.get('/user', requireLogin, (req, res) => {
        res.send(req.user);
    })

    app.get('/api/logout', requireLogin, (req, res) => {
        req.logout();
        res.redirect('/');
    })
    
}