const { agent } = require('supertest')
const makeId = require('./helper')
const app = require('../../server')
const db = require('../../services/database');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe('When new user coming to the website and start to like and watch movies', () => {
    let email
    let password
    let request 
    let randomPage


    beforeAll(() => {
        request = agent(app)
        email = makeId(11)
        password =  makeId(12)
        randomPage = getRandomInt(20)
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

    test ('It should be able to like movie', async () => {
        let movieList = await request.get(`/movie/trending?page=${randomPage}`).expect(200)

        let movieListJson = movieList.body
        let ranMovieLen = getRandomInt(movieListJson.length)
        let ranMovie = movieListJson[ranMovieLen]

        let like = await request
            .post('/api/like')
            .set('Content-Type', 'application/json')
            .send({
                movie: ranMovie
            }).expect(200)
    })

    test ('It should be able to watch movie', async () => {
        let movieList = await request.get(`/movie/trending?page=${randomPage}`).expect(200)

        let movieListJson = movieList.body
        let ranMovieLen = getRandomInt(movieListJson.length)
        let ranMovie = movieListJson[ranMovieLen]

        let like = await request
            .post('/api/watch')
            .set('Content-Type', 'application/json')
            .send({
                movie: ranMovie
            }).expect(200)
    })

    afterAll(done => {
        done()
    })
})