const { agent } = require('supertest')
const makeId = require('./helper')
const app = require('../../server')
const db = require('../../services/database')

/*
* New user test
*/
describe('When new user coming to the website and want to remove the account', () => {
    let email
    let password
    let newPassword
    let request 

    beforeAll(() => {
        request = agent(app)
        email = makeId(11)
        password =  makeId(12)
        newPassword = makeId(9)
    })

    test ('It should Able To Signup Successfully', done => {
        request
            .post("/api/signup")
            .set('Content-Type', 'application/json')
            .send({
                email,
                password
            })
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })

    test ('It Should Able To Login Successfully', done => {
        request
            .post("/api/login")
            .set('Content-Type', 'application/json')
            .send({
                email,
                password
            })
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })

    test('It should be able to change password', done => {
        request
            .put('/api/password')
            .set('Content-Type', 'application/json')
            .send({
                password
            })
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })

    test('It should be able to delete acc', done => {
        request
            .delete('/api/account')
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })

    afterAll(done => {
        done()
    })
})

