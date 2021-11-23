const requireLogin = require('./requireLogin')
const axios = require('axios')
const config = require('../config')

module.exports = app => {
    app.get('/movie/now_playing', requireLogin, async (req, res) => {
        let page = req.query.page ? req.query.page : 1;
        try {
            let result = await sendGET("/movie/now_playing", page);
            res.status(200).send(result.results);
        } catch (e) {
            res.status(404).send({ status: false})
        }
    })

    app.get('/movie/trending', requireLogin, async (req, res) => {
        let page = req.query.page ? req.query.page : 1;
        try {
            let result = await sendGET("/movie/popular", page);
            res.status(200).send(result.results);
        } catch (e) {
            res.status(404).send({ status: false})
        }
    })

    app.get('/movie/latest', requireLogin, async (req, res) => {
        let page = req.query.page ? req.query.page : 1;
        try {
            let result = await sendGET("/movie/latest", page);
            res.status(200).send(result.results);
        } catch (e) {
            res.status(404).send({ status: false})
        }
    })

    app.get('/movie/search', requireLogin, async (req, res) => {
        let kw = req.query.search
        let page = req.query.page ? req.query.page : 1;
        if (!kw) return res.status(404).send({status: false, message: "search param not found"});

        try {
            const response = await axios({
                method: 'get',
                url: `${config.host}/search/movie`,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    api_key: config.apiKey,
                    query: kw,
                    page
                }
            })
            res.status(200).send(response.data.results)
        } catch (e) {
            res.status(404).send({status: false, message: `can't search movie`})
        }
    })

    app.get('/movie/:id/cast', requireLogin, async (req, res) => {
        let id = req.params.id; 

        try {
            const response = await axios({
                method: 'get',
                url: `${config.host}/movie/${id}/credits`,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    api_key: config.apiKey,
                }
            })
            res.status(200).send(response.data.cast)
        } catch (e) {
            res.status(404).send({status: false, message: `Movie Id Not Found`})
        }
    })
}

async function sendGET(path, page) {
    try {
        const response = await axios({
            method: 'get',
            url: `${config.host}${path}`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                api_key: config.apiKey,
                page
            }
        })
        return response.data
    } catch (e) {
        return e.response.data
    }
}