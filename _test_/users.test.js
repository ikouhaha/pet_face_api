const request = require('supertest')
const app = require('./common/index')
const helper = require('./common/helper')
const config = require('../config')
const  testData  = require("../testData");
const model = require('../models/users')


const randomName = () => (Math.random() + 1).toString(36).substring(7)



const expectCase1 = { "_id":  "62b471a91d3569451e6c14ce" , "dateRegistered": "2022-06-23T13:59:04.039Z" , "password": "$2a$10$0d/xQ.WHeAB3yZOxpgSBv.4RkXvnfKPCEblHjLSjdUHEJDin.nAka", "fID": "zTuvOC0mM4Vrudel0ldTu7I4wnw1", "role": "user", "displayName": "Philip Lindsey", "avatarUrl": "https://lh3.googleusercontent.com/a/AATXAJzTl5l5EpnbtGPjWW83lOPTkuVg-3nDlhpGMSCk=s96-c", "fid": "zTuvOC0mM4Vrudel0ldTu7I4wnw1", "email": "philiplindsey.71131@gmail.com", "username": "zTuvOC0mM4Vrudel0ldTu7I4wnw1", "favourites": {}, "id": 55 }

describe('Users Testing Cases', () => {
  it('Return all users', async () => {
    config.TEST_MODE = "2"
    const token = await helper.getLoginToken(request(app.callback()), "admin", "123")

    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/users')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(expectCase1)

  })

  it('Return the specified users', async () => {
    config.TEST_MODE = "2"
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")

    const res = await request(app.callback())
      .get('/api/v1/users/55')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(expectCase1)

  })

  it("Return the user's profile", async () => {
    config.TEST_MODE = "1"
    const token = "1234"

    const res = await request(app.callback())
      .get('/api/v1/users/profile')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    
    const user = { ...testData.user, isLogin: true,token:token } 
    expect(res.body).toEqual(user)

  })

  it("change user's profile", async () => {
    config.TEST_MODE = "3"
    const token = "1234"
    const res = await request(app.callback())
      .put('/api/v1/users/73')
      .set({ Authorization: token })
      .send({ firstName: "Dennis test123", username: "ikouhaha999", companyCode: "111", email: "ikouhaha000@gmail.com", "role": "staff" })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })


  it("change user's pwd", async () => {
    config.TEST_MODE = "3"
    const token = "1234"
    const res = await request(app.callback())
      .put('/api/v1/users/p/73')
      .set({ Authorization: token })
      .send({ password: "123" })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })

  it("Connect with google test", async () => {
    
    config.TEST_MODE = "3"
    const token = "1234"
    const res = await request(app.callback())
      .put('/api/v1/users/connect/73')
      .set({ Authorization: token })
      .send({ avatarUrl: "https://lh3.googleusercontent.com/a/AATXAJwx1Xg_pxBWwoCNbG_u-lvz24ZLjtZxpFoBVTZt=s96-c", googleId: parseInt(Math.random() * 99999999999).toString() }) //mockgoogleid

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")


  })



  it('delete and create a new users', async () => {
    config.TEST_MODE = "3"
    
   
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        "email": "test@example.com",
        "password": "123",
        "username": "test",
        "firstName": "",
        "lastName": "",
        "role": "user",
        "companyCode": "",
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
    result = await model.deleteUser("test2@example.com")
    expect(result.status).toEqual(201)

  })

  it('delelete and create a new staff', async () => {

   
    //public user register
    const res = await request(app.callback())
      .post('/api/v1/users')
      .send({
        "email":  "test2@example.com",
        "password": "123",
        "username": "test2",
        "firstName": "",
        "lastName": "",
        "role": "staff",
        "companyCode": "111",
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  
      result = await model.deleteUser("test2@example.com")
      expect(result.status).toEqual(201)
  

  })

})
