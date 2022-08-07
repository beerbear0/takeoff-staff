'use strict'

const response = require('../response')
const db = require('../Settings/db')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
const md5 = require('md5')
exports.signup = (req, res) => {
    db.query("SELECT `id`, `email` FROM `user` WHERE `email`= '" + req.body.email + "'", (err, rows) => {
        if(err) {
            response.status(400, err, res)
        } else if (rows.length > 0) {
            response.status(302, {message: `Пользователь с email - ${req.body.email} уже существует`}, res)
        } else {
            const name = req.body.name
            const email = req.body.email
            const phone = req.body.phone
            const salt = bcrypt.genSalt(15)
            const lastname = req.body.lastname
            // const password = bcrypt.hashSync(req.body.password, salt)
            const password = md5(req.body.password)
            const sql = "INSERT INTO `user`(`email`, `name`, `last_name`, `password`) VALUES ('"+ email + "', '" + name + "', '" + lastname + "', '" + password + "')"
            db.query(sql, (err, results) => {
                if (err) {
                    response.status(400, err, res)
                } else {
                    response.status(200, {message: 'Регистрация прошла успешно!', results}, res)
                }
            })
        }
    })
}

exports.signin = (req, res) => {
    db.query("SELECT `id`, `email`, `password` FROM `user` WHERE `email`='" + req.body.email + "'", (err, rows) => {
        if(err) {
            response.status(400, err, res)
        } else if (rows.length <= 0) {
            response.status(404, {message: 'Пользователь с таким email не найден'}, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            const password = md5(req.body.password)
            if(password === row[0].password) {
                const token = jwt.sign({
                        id: row[0].id,
                        email: row[0].email,
                    },
                    config.jwt, {expiresIn: 12000 * 12000})
                response.status(200, `Bearer ${token}`, res)
            } else {
                response.status(400, {message: "Пароль не верный"}, res )
            }
        }
    })
}