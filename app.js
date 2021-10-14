const express = require('express')
const app = express()

const PORT = 3000 || process.env.PORT

app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`)
})