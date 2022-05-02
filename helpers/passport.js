const passport = require('koa-passport')

const basicAuth = require('../strategies/basic')
const googleAuth = require('../strategies/google')
const jwtAuth = require('../strategies/jwt')

passport.use(basicAuth)
passport.use(googleAuth)
passport.use(jwtAuth)

// passport.serializeUser(function (user, done) {
//     done(null, user)
// })

// passport.deserializeUser(function (user, done) {
//     return done(null, user)
// })


module.exports = passport