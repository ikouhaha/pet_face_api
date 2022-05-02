const request = require('supertest')
const app = require('./common/index')
const allBreedsExpected = require("../docs/responseJson/breeds.json")[0]
const breedDetailExpected = require("../docs/responseJson/breed.json")

describe('Breeds Testing Cases', () => {
  it('Return all breeds', async() => {
    const res = await request(app.callback())
      .get('/api/v1/breeds')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(allBreedsExpected)
    
  })

  it('get breed information by id', async() => {
    const res = await request(app.callback())
      .get('/api/v1/breeds/1')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(breedDetailExpected)
    
  })
  
})
