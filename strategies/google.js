

const config = require("../config")
const util = require("../helpers/util")
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const users = require('../models/users')


const authUser = async (accessToken, refreshToken, profile, done) => {
    // look up the user and check the email if the user exists
    // call done() with either an error or the user, depending on outcome
    try {
        let ex
        if (!profile) {
            return done(null, false); //without profile
        }
        let email = profile.email
        let result
        let user

        result = await users.findByGoogleId(profile.id)

        if (!result) {
            return done(null,{status:401,message:"No user found"})
        }



        user = result
        //security
        delete user.password
        delete user.googleId


        return done(null, user);
    }
    catch (error) {
        console.error(`Error during authentication for user ${error}`)
        return done(error);
    }


}

const strategy = new GoogleTokenStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET
    
    
}, authUser
)


module.exports = strategy

