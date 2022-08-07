'use strict'

module.exports = (app) => {
    const passport = require('passport')
    const usersController = require('../Controller/userController')
    const contactsController = require('../Controller/contactsList')

    app
        .route('/api/auth/signup')
        .post(usersController.signup)

    app
        .route('/api/auth/signin')
        .post(usersController.signin)

    app
        .route('/api/contacts')
        .get(passport.authenticate('jwt', { session: false }), contactsController.getContacts)

    app
        .route('/api/contacts/update')
        .put(passport.authenticate('jwt', { session: false }), contactsController.updateContact)

    app
        .route('/api/contacts/add')
        .post(passport.authenticate('jwt', { session: false }), contactsController.addContact)

    app
        .route('/api/contacts/delete')
        .delete(passport.authenticate('jwt', { session: false }), contactsController.deleteContacts)

}