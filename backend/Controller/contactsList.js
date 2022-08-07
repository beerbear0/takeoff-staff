'use strict'

const response = require('../response')
const db = require('../Settings/db')

exports.getContacts = (req, res) => {
    db.query("SELECT * FROM `contacts`", (err, rows) => {
        if(err) {
            response.status(400, err, res)
        } else {
            response.status(200, rows, res)
        }
    })
}

exports.addContact = (req, res) => {
    db.query("SELECT * FROM `contacts` WHERE `email`", (err, rows) => {
        if(err) {
            response.status(400, err, res)
        } else if (rows.length > 0) {
            response.status(302, {message: `Пользователь с таким email - ${req.body.email} уже есть`}, res)
        } else {
            const name = req.body.name
            const email = req.body.email
            const phone = req.body.phone
            const lastname = req.body.lastname

            const sql = "INSERT INTO `contacts`(`name`, `lastname`, `phone`, `email`) VALUES ('" + name + "', '" + lastname + "', '" + phone + "', '" + email + "')"

            db.query(sql, (err, row) => {
                if(err) {
                    response.status(400, err, res)
                } else {
                    response.status(200, row, res)
                }
            })
        }
    })
}

exports.updateContact = (req, res) => {
    db.query("SELECT * FROM `contacts` WHERE `id`='" + req.body.id + "'", (err, rows) => {
        if(err) {
            response.status(400, err, res)
        } else {
            const name = req.body.name
            const lastname = req.body.lastname
            const phone = req.body.phone
            const email = req.body.email
            const sql = "UPDATE `contacts` SET `name`='" + name + "',`lastname`='" + lastname + "',`phone`='" + phone + "',`email`='" + email + "' WHERE `id`='" + rows[0].id + "'"
            db.query(sql, (err, row) => {
                if(err) {
                    response.status(400, err, res)
                } else {
                    response.status(200, rows, res)
                }
            })
        }
    })
}


exports.deleteContacts = (req, res) => {
    const sql = "DELETE FROM `contacts` WHERE `id`='" + req.body.id + "'"
    db.query(sql, (err, rows) => {
        if(err) {
            response.status(400, err, res)
        } else if(rows.length <= 0) {
            response.status(404, {message: 'Контакт не найден'}, res)
        } else {
            response.status(200, {message: 'Контакт удалён'}, res)
        }
    })
}
