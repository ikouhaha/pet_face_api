
const Koa = require('koa')
require('dotenv').config()
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const auth = require('../../routes/auth.js')
const options = require('../../routes/options.js')
const posts = require('../../routes/posts.js')
const user = require('../../routes/users')
const comments = require('../../routes/comments')
const company = require('../../routes/companies')
const favourites = require('../../routes/favourites')
const passport = require('../../helpers/passport')


app.use(passport.initialize())
app.use(bodyParser())
app.use(auth.routes())
app.use(options.routes())
app.use(posts.routes())
app.use(user.routes())
app.use(company.routes())
app.use(favourites.routes())
app.use(comments.routes())

module.exports = app