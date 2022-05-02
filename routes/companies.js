const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/company')
const can = require('../permission/user')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/companies' })
const util = require('../helpers/util')
const { validateCompany } = require('../controllers/validation')

router.get('/', auth, getAll)
router.get('/:id([0-9]{1,})', auth, getById);
router.post('/', validateCompany, createCompany) //for public user register


async function getAll(ctx) {
  try {
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
    util.createErrorResponse(ctx,ex)

  }
}

async function getById(ctx) {
  try {
    let id = parseInt(ctx.params.id)
    const permission = can.read(ctx.state.user, { "id": id })
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      const result = await model.getById(id)
      if (result.length) {
        ctx.body = result;
      }
    }
  } catch (ex) {
    util.createErrorResponse(ctx,ex)

  }
}

async function createCompany(ctx) {
  try {
    const body = ctx.request.body
    body.dateRegistered = new Date()
    body.code = util.genUUID()
    let result = await model.createCompany(body)
    
    if (result) {
      result.code = body.code
      ctx.status = 201
      ctx.body = result
    } else {
      ctx.status = 201
      ctx.body = "{}"
    }
  } catch (ex) {
    util.createErrorResponse(ctx,ex)

  }

}




module.exports = router