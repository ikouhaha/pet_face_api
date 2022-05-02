
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const config = require('../config')

const secret = config.SECRET

const users = require('../models/users')
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secret


const checkUser = async (jwt_payload, done) => {
    // look up the user and check the password if the user exists
    // call done() with either an error or the user, depending on outcome
    let result
    try {
        result = await users.findByUsername(jwt_payload.username)
    } catch (error) {
        console.error(`Error during jwt authentication for user ${username}`)
        return done(error)
    }
    if (result.length) {
        const user = result[0]
        //security
        delete user.password
        delete user.googleId
        return done(null, user)
    } else {
        //console.log(`No user found with username `)
    }

    return done(null, false) // token expired?
}


const strategy = new JwtStrategy(opts, checkUser)


module.exports = strategy