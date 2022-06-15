
const Passport = require('../helpers/passport.js')



module.exports = Passport.authenticate(['custom'],{session:false})
