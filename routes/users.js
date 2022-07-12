const Router = require('koa-router')

const companyModel = require('../models/company')
const model = require('../models/users')
const can = require('../permission/user')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/users' })
const util = require('../helpers/util')
const testData = require('../testData')

const { validateUser,validateUserProfile,validateUserPwd,validateUserGoogle } = require('../controllers/validation')

router.get('/', auth, getAll)
router.get('/:id([0-9]{1,})', auth, getById);
router.post('/', validateUser, createUser) //for public user register, so without auth
router.put('/:id([0-9]{1,})', auth, validateUserProfile, updateUser)
router.put('/connect/:id([0-9]{1,})', auth, validateUserGoogle, updateUser)
router.put('/p/:id([0-9]{1,})', auth, validateUserPwd, updateUserPwd)
router.get('/profile',auth, profile)

async function profile(ctx, ext) {
  if (ctx.isAuthenticated()) {
    ctx.status = 200
    const user = { ...ctx.state.user, isLogin: true,token:ctx.headers.authorization }
    
    delete user.password
    if(ctx.state.user.status){
      ctx.status = ctx.state.user.status
    }
    
    if(ctx.state.user.message){
      ctx.message = ctx.state.user.message
    } 

    ctx.body = user
   
  } else {
    ctx.status = ctx.state.user.status
    ctx.message = ctx.state.user.message
  }
}



 

async function getAll(ctx) {
  try {
    ////check the role permission
    const permission = can.readAll(ctx.state.user)
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      const result = await model.getAll()
      if (result.length) {
        ctx.body = result;
      }
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function getById(ctx) {
  try {
    let id = parseInt(ctx.params.id)
   
    //check the role
    const permission = can.read(ctx.state.user, { "id": id })
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      const result = await model.getById(id)
      
      if (result) {
        ctx.body = result;
      }
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function createUser(ctx) {
  try {
    const body = ctx.request.body
    
    body.dateRegistered = new Date()
    body.password = util.getHash(body.password)
    body.isRegisterpost = false
    
    if (body.role == "staff") {
      let company = await companyModel.findByCode(body.companyCode)
      if (!company) {
        throw new Error("can't found the company");
      } else {
        body.company = company;
      }

    }

    let result = await model.createUser(body)
    if (result) {
      result.message = "create user successfully"
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }

}

async function updateUser(ctx) {

  try {
    let id = parseInt(ctx.params.id)
    const body = ctx.request.body
    //not need update google id
   
    //check the role permission
    const permission = can.update(ctx.state.user, { "id": id })
    if (!permission.granted) {
      ctx.status = 403;
      return;
    }

    //bind the new google account
    if(body.googleId){
      //checking the googleid is used?
      let googleId = await model.findByGoogleId(body.googleId)
      if(googleId){
        ctx.status = 400
        ctx.body = "The google account is registered"
        return
      }
    }
    let result = await model.updateUser(id, body)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}



async function updateUserPwd(ctx) {

  try {
    let id = parseInt(ctx.params.id)
    const body = ctx.request.body
    body.password = util.getHash(body.password)
    //check the role
    const permission = can.update(ctx.state.user, { "id": id })
    if (!permission.granted) {
      ctx.status = 403;
    }
    let result = await model.updateUser(id, body)
    if (result) {
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}



module.exports = router