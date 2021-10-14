const sqlite3 = require('sqlite3').verbose()
const path = require('path')

module.exports = new sqlite3.Database(path.resolve(__dirname, '../NexFlin.sqlite'), sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw `unable to connect ${err}`
    
    console.log('connected to db')
})