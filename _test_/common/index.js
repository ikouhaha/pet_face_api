
const Koa = require('koa')
require('dotenv').config()
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const config = require('../../config')

var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const options = require('../../routes/options.js')
const posts = require('../../routes/posts.js')
const user = require('../../routes/users')
const company = require('../../routes/companies')
const passport = require('../../helpers/passport')

config.IS_TEST = true

app.use(passport.initialize())
app.use(bodyParser())
app.use(options.routes())
app.use(posts.routes())
app.use(user.routes())
app.use(company.routes())


module.exports = app