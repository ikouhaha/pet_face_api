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
    let id = ctx.params.id
    const permission = can.read(ctx.state.user, { "companyCode": id })
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      const result = await model.findByCode(id)
      if (result) {
        ctx.body = result;
      }
    }
  } catch (ex) {
    util.createErrorResponse(ctx,ex)

  }
}




module.exports = router