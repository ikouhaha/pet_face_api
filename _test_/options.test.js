const request = require('supertest')
const app = require('./common/index')

describe('Options Testing Cases', () => {
  it('Return all dog breeds', async() => {
    const res = await request(app.callback())
      .get('/api/v1/options/breeds/dog')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(require("../docs/responseJson/dogBreeds.json")[0])
    
  })

  it('Return all cat breeds', async() => {
    const res = await request(app.callback())
      .get('/api/v1/options/breeds/cat')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(require("../docs/responseJson/catBreeds.json")[0])
    
  })

  it('Return all districts', async() => {
    const res = await request(app.callback())
      .get('/api/v1/options/districts')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(require("../docs/responseJson/districts.json")[0])
    
  })
  
})
