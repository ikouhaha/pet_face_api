
const Passport = require('../helpers/passport.js')



let auth = async (ctx, next) => {

    //if header contains authorization need auth
    if(ctx.header.authorization&&ctx.header.authorization)  { 
        await Passport.authenticate(['jwt'],{session:false})(ctx, next)
    } else{
        //no need return
        await next()
    }
}

module.exports = auth


