const Router = require('koa-router')


const dogModel = require('../models/dogs')
const model = require('../models/users')
const can = require('../permission/dog')
const auth = require('../controllers/auth')
const router = Router({ prefix: '/api/v1/favourites' })
const util = require('../helpers/util')



router.put('/:dogId([0-9]{1,})/:isFavourite', auth, favouriteDog)
router.get('/', auth, getFavourites)



async function favouriteDog(ctx) {

  try {
    let dogId = parseInt(ctx.params.dogId)
    let isFavourite = JSON.parse(ctx.params.isFavourite)

    //check the dog is exists
    let dogFind = await dogModel.getById(dogId)

    if(!dogFind){
      ctx.status = 404
      ctx.body = "The dogs not found"
      return;
    }
    //everyone can like the dog (data) , so no need check permission
    let favourites = {...ctx.state.user.favourites,[dogId]:isFavourite}
    let result = await model.updateUser(ctx.state.user.id, {
      favourites: {...favourites}
    })
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



async function getFavourites(ctx, next) {
  try {
    const body = ctx.request.query
    
    const { page, limit, ...data } = body
    //string to be like string such as '% str %'
    let favourites = Object.keys(ctx.state.user.favourites).filter(f=>ctx.state.user.favourites[f]==true).map(o=>parseInt(o))
    let filterData = {id:{'$in':favourites}}
    
    const results = await dogModel.getAllByFilter(filterData, { page: parseInt(body.page), limit:parseInt(body.limit), order: body.order })
    const totalCount = await dogModel.getAllCount(filterData)
    
    //favouritesPage no create 
    let canCreate = false;
    
    
    if (results.length) {

      for (result of results) {
        if (ctx.isAuthenticated()) {
          const canUpdate = can.update(ctx.state.user, result).granted
          const canDelete = can.delete(ctx.state.user, result).granted
         
          result.canUpdate = canUpdate;
          result.canDelete = canDelete;
          result.isFavourite = ctx.state.user.favourites[result.id]
        }

      }
      ctx.body = {}
      ctx.body.canCreate = canCreate
      ctx.body.totalCount = totalCount
      ctx.body.list = results
      
      ctx.body.favourites = ctx.isAuthenticated()?ctx.state.user.favourites:{}
      
      
    }else{
      //return empty
      ctx.status = 200
      ctx.body = {}
      ctx.body.canCreate = canCreate
      ctx.body.totalCount = 0
      ctx.body.favourites = {}
      ctx.body.list = []
    }

  } catch (ex) {
    util.createErrorResponse(ctx, ex)

  }
}



module.exports = router