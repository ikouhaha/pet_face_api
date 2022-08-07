const config = require('../config')
const request = require('supertest')
const app = require('./common/index')
const companies = require('../docs/responseJson/companies.json')

//admin role check company
describe('admin role check all company', () => {
  it('Return all companies', async() => {
    config.TEST_MODE = "2"
    const res = await request(app.callback())
      .get('/api/v1/companies')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(companies)
    
  })

  it('Return the company', async() => {
    config.TEST_MODE = "2"
    const res = await request(app.callback())
      .get('/api/v1/companies/111')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(companies)
    
  })

 
  
})
