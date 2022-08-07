const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config')
const db =require('../Settings/db')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, (payload, done) => {
            try {
                db.query("SELECT `id`, `email` FROM `user` WHERE `id` = '" + payload.userId + "'", (err, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        const user = rows
                        if(user) {
                            done(null, user)
                        } else {
                            done(null, false)
                        }
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
    )
}