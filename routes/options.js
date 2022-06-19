const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/options')

const router = Router({ prefix: '/api/v1/options' })
const util = require('../helpers/util')


router.get('/breeds/:type', getAllBreeds) 
router.get('/districts', getAllDistricts) 


async function getAllBreeds(ctx, next) {
  try {
    const type = ctx.params.type;
    const results = await model.getAllBreeds(type)
    if (results.length) {
      ctx.body = results;
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function getAllDistricts(ctx, next) {
  try {

    const results = await model.getAllDistricts()
    if (results.length) {
      ctx.body = results;
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


async function getById(ctx) {
  try {
    let id = parseInt(ctx.params.id)
    const result = await model.getById(id)
    if (result) {
      ctx.body = result;
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}


module.exports = router