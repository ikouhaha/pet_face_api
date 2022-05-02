const Koa = require('koa')
const socketIo = require('socket.io');

require('dotenv').config()

const app = new Koa()

const auth = require('./routes/auth.js')
const breeds = require('./routes/breeds.js')
const dogs = require('./routes/dogs.js')
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


const origin = config.COR_ORIGINS
const options = {
    origin: [origin]

}

app.use(cors(options));

// Sessions
app.use(static({ dir: 'docs', router: '/doc/' }))
app.use(bodyParser())
app.use(passport.initialize())
app.use(auth.routes())
app.use(breeds.routes())
app.use(dogs.routes())
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
