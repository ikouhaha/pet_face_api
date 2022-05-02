const request = require('supertest')
const app = require('./common/index')
const userExpected = require("../docs/responseJson/login.json")



describe('Authentication Testing Cases', () => {
  it('login test', async () => {
    //login with admin account , basic auth
    const res = await request(app.callback())
      .post('/api/v1/auth')
      .auth('admin', '123')
      .send({})
    
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("text/plain")
    expect(res.text).toContain("Bearer")
  })
  //no method to do that now , pending to done
  xit('google login test', async () => {
  
  })

  it('logout test', async () => {

    const res = await request(app.callback())
      .get('/api/v1/auth/signout')      
      .send({})

    expect(res.statusCode).toEqual(200)
  })

})
