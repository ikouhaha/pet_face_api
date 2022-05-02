const request = require('supertest')
const app = require('./common/index')
const userExpected = require("../docs/responseJson/user.json")
const breedDetailExpected = require("../docs/responseJson/breed.json")
const helper = require('./common/helper')


const randomName = () => (Math.random() + 1).toString(36).substring(7)

const expected = {
  "_id": expect.any(String),
  "email": expect.any(String),
  "password": expect.any(String),
  "username": expect.any(String),
  "firstName": expect.any(String),
  "lastName": expect.any(String),
  "role": expect.stringMatching(/staff|user|admin/),
  "companyCode": expect.any(String),
  "avatarUrl": expect.any(String),
  "googleId": expect.any(String),
  "dateRegistered": expect.any(String),
  "favourites": expect.any(Object),
  "company": expect.any(Object),
  "id": expect.any(Number)
}

const expectedProfile = {
  "_id": expect.any(String),
  "email": expect.any(String),  
  "username": expect.any(String),
  "firstName": expect.any(String),
  "lastName": expect.any(String),
  "role": expect.stringMatching(/staff|user|admin/),
  "companyCode": expect.any(String),
  "avatarUrl": expect.any(String),  
  "dateRegistered": expect.any(String),
  "favourites": expect.any(Object),
  "company": expect.any(Object),
  "id": expect.any(Number),
  "isLogin": expect.any(Boolean),
  "token": expect.any(String)
}

describe('Users Testing Cases', () => {

  it('Return all users', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "admin", "123")
    
    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/users')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(expected)

  })

  it('Return the specified users', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .get('/api/v1/users/71')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(expected)

  })

  it("Return the user's profile", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .get('/api/v1/users/profile')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(expectedProfile)

  })

  it("change user's profile", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .put('/api/v1/users/71')
      .set({ Authorization: token })      
      .send({firstName:"Dennis test123",username:"ikouhaha999",companyCode:"7df96371-eac9-40b2-a734-1cf4a8ba433f",email:"ikouhaha999@gmail.com","role":"staff"})
    
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
    

  })


  it("change user's pwd", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .put('/api/v1/users/p/71')
      .set({ Authorization: token })
      .send({password:"123"})
    
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
    

  })

  it("Connect with google test", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .put('/api/v1/users/connect/71')
      .set({ Authorization: token })
      .send({avatarUrl:"https://lh3.googleusercontent.com/a/AATXAJwx1Xg_pxBWwoCNbG_u-lvz24ZLjtZxpFoBVTZt=s96-c",googleId:parseInt(Math.random()*99999999999).toString()}) //mockgoogleid
    
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
    

  })

  

  xit('create a new users', async () => {

    //public user register
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        "email": randomName()+"@example.com",
        "password": "123",
        "username": randomName(),
        "firstName": "",
        "lastName": "",
        "role": "user",
        "companyCode": "",            
      })
    
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })

  xit('create a new staff', async () => {

    //public user register
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        "email": randomName()+"@example.com",
        "password": "123",
        "username": randomName(),
        "firstName": "",
        "lastName": "",
        "role": "staff",
        "companyCode": "7df96371-eac9-40b2-a734-1cf4a8ba433f",        
      })
    
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })

})
