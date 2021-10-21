const axios = require('axios')

async function signup(email, password) {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/signup',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email,
                password
            }
        })
        return response.data
    } catch (e) {
        return e.response.data
    }
}

async function login(email, password) {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email,
                password
            }
        })
        return response.data
    } catch (e) {
        return e.response.data
    }
}

module.exports = {
    signup,
    login
}