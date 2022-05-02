const Router = require('koa-router')


const model = require('../models/comments')
const userModel = require('../models/users')
const can = require('../permission/comment')
const authWithPublic = require('../controllers/authWithPublic')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/comments' })
const util = require('../helpers/util')
const { validateComment } = require('../controllers/validation')
const config = require('../config')




router.get('/:dogId([0-9]{1,})', authWithPublic, getCommentByDogId)
router.post('/', authWithPublic, validateComment, createComment)
router.delete('/:id', auth, deleteComment)

async function createComment(ctx) {
  try {
    const body = ctx.request.body

    if (ctx.isAuthenticated()) {
      body.userId = ctx.state.user.id
    }

    body.commentDate = new Date()


    let result = await model.add(body)
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



async function getCommentByDogId(ctx, next) {
  try {
    const dogId = ctx.request.params.dogId

    //string to be like string such as '% str %'
    const results = await model.getByDogId(dogId)
    if (results.length) {

      for (result of results) {
        if (ctx.isAuthenticated()) {

          const canDelete = can.delete(ctx.state.user).granted


          result.canDelete = canDelete;

        }
        if (result.user) {          
          result.author = result.user.firstName + " " + result.user.lastName
          result.avatar = result.user.avatarUrl
        } else {
          result.author = "Guest"
          result.avatar = config.DEFAULT_IMAGE
        }
        result.datetime = result.commentDate

      }
     
      ctx.body = results

    } else {
      //return empty
      ctx.status = 200
      ctx.body = []
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}

async function deleteComment(ctx) {
  try {
    let id = parseInt(ctx.params.id)
 
    const permission = can.delete(ctx.state.user)
    if (!permission.granted) {
      ctx.status = 403;
      return;
    }
    let result = await model.delete(id)
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