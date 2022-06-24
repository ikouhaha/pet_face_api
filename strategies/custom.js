


const CustomStrategy = require("passport-custom").Strategy
var admin = require("firebase-admin");
const users = require('../models/users')
const util = require('../helpers/util')

const checkUser = async (req, done) => {
    // look up the user and check the password if the user exists
    // call done() with either an error or the user, depending on outcome

    try {

        var token = req.headers.authorization==null?null:req.headers.authorization.replace("Bearer ", "");
        var fuser = await admin.auth().verifyIdToken(token)
        result = await users.findByEmail(fuser.email)


        if (!result&&fuser) {
            //create user
            user = {}
            user.dateRegistered = new Date()
            user.password = util.getHash(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5))
            user.fID = fuser.uid
            user.role = "user"
            user.displayName = fuser.name
            user.avatarUrl = fuser.picture
            user.fid = fuser.uid
            user.email = fuser.email?fuser.email:null
            user.username = fuser.uid
        
            await users.createUser(user)
            result = await users.findByFID(user.fid)


            //return done(null, { status: 401, message: "No user found", firebaseUser: user })
        }

        user = result
        //security
        delete user.password
        delete user.googleId


        return done(null, user);
    }
    catch (error) {
        console.error(`Error during authentication for user ${error}`)
        return done(null, { status: 401, message: error.message })
    }

}


const strategy = new CustomStrategy(checkUser)


module.exports = strategy