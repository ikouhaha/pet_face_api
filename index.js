const Koa = require('koa')
const socketIo = require('socket.io');

require('dotenv').config()

const app = new Koa()

const optionsRouter = require('./routes/options.js')
const posts = require('./routes/posts.js')
const user = require('./routes/users')
const chat = require('./routes/chat')
const comments = require('./routes/comments')
const company = require('./routes/companies')
const favourites = require('./routes/favourites')
const passport = require('./helpers/passport')
const config = require('./config')


const bodyParser = require('koa-bodyparser')

const static = require('koa-static-router')
const cors = require('@koa/cors');


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const origin = config.COR_ORIGINS
const options = {
    origin: "*"

}

app.use(cors(options));

// Sessions
app.use(static({ dir: 'docs', router: '/doc/' }))
app.use(bodyParser())
app.use(passport.initialize())
app.use(optionsRouter.routes())
app.use(posts.routes())
app.use(user.routes())
app.use(company.routes())
app.use(favourites.routes())
app.use(comments.routes())

const port = config.PORT
const host = config.HOST


let server
if (host) {
    server = app.listen(port, host)
} else {
    server = app.listen(port)
}

const io = socketIo(server, { 
    perMessageDeflate: false,
    cors: { origin: origin },
    //transports: ["websocket","polling"] 
});

chat(io)
