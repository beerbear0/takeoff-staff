const mysql = require('mysql')
const config = require('../config')

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.DBUSER,
    port: config.PORT,
    database: config.DBNAME,
    password: config.DBPASSWORD
})

connection.connect(err => {
    if(err) {
        return console.log('Ошибка подключения к БД')
    } else {
        return console.log('Подключение успешно')
    }
})

module.exports = connection