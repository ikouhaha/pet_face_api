const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/breeds')

const router = Router({ prefix: '/api/v1/breeds' })
const util = require('../helpers/util')


router.get('/:type', getAll) //for public user
router.get('/:id([0-9]{1,})', getById); // for public user


async function getAll(ctx, next) {
  try {
    const type = ctx.params.type;
    const results = await model.getAll(type)
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