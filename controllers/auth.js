
const Passport = require('../helpers/passport.js')



module.exports = Passport.authenticate(['jwt'],{session:false})
