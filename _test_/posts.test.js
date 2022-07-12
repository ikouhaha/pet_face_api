const request = require('supertest')
const app = require('./common/index')
const helper = require('./common/helper')
const postSample = require('../docs/requestJson/post.json')

expect.extend({
  nullOrAny(received, expected) {
    if (received === null) {
      return {
        pass: true,
        message: () => `expected null or instance of ${this.utils.printExpected(expected) }, but received ${ this.utils.printReceived(received) }`
      };
    }

    if (expected == String) {
      return {
        pass: typeof received == 'string' || received instanceof String,
        message: () => `expected null or instance of ${this.utils.printExpected(expected) }, but received ${ this.utils.printReceived(received) }`
      };        
    }

    if (expected == Number) {
      return {
        pass: typeof received == 'number' || received instanceof Number,
        message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
      };
    }

    if (expected == Function) {
      return {
        pass: typeof received == 'function' || received instanceof Function,
        message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
      };
    }

    if (expected == Object) {
      return {
        pass: received !== null && typeof received == 'object',
        message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
      };
    }

    if (expected == Boolean) {
      return {
        pass: typeof received == 'boolean',
        message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
      };
    }

    /* jshint -W122 */
    /* global Symbol */
    if (typeof Symbol != 'undefined' && this.expectedObject == Symbol) {
      return {
        pass: typeof received == 'symbol',
        message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
      };
    }
    /* jshint +W122 */

    return {
      pass: received instanceof expected,
      message: () => `expected null or instance of ${this.utils.printExpected(expected)}, but received ${this.utils.printReceived(received)}`
    };
  }
});


const expected = {
  "_id":  expect.any(String),
  "about": expect.any(String),
  "breedID": expect.any(Number),
  "imageBase64": expect.any(String),
  "createdBy": expect.any(Number),
  "id": expect.any(Number),
  "type": expect.any(String),
  "companyCode": expect.nullOrAny(String),
  "imageFilename": expect.any(String),
  "petType": expect.any(String),
  "cropImageBase64": expect.any(String),
  "districtId": expect.any(Number),
  "createdOn": expect.any(String),
  "createdByName": expect.any(String),
  
  "district": expect.any(String),
  "districtId": expect.any(Number),
  
}




describe('posts Testing Cases', () => {

  it('Return all posts', async () => {
    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/posts?page=1&limit=10')      
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.length).toBeLessThan(11)
    var result =  JSON.parse(JSON.stringify(res.body))[0]
    expect(result.about).toEqual(expected.about)
    expect(result.breedID).toEqual(expected.breedID)
    expect(result.companyCode).toEqual(expected.companyCode)
    expect(result.createdBy).toEqual(expected.createdBy)
    expect(result.createdByName).toEqual(expected.createdByName)
    expect(result.createdOn).toEqual(expected.createdOn)
    expect(result.cropImageBase64).toEqual(expected.cropImageBase64)
    expect(result.district).toEqual(expected.district)
    expect(result.districtId).toEqual(expected.districtId)
    expect(result.id).toEqual(expected.id)
    expect(result.imageBase64).toEqual(expected.imageBase64)
    expect(result.imageFilename).toEqual(expected.imageFilename)
    expect(result.petType).toEqual(expected.petType)
    expect(result.type).toEqual(expected.type)
    // expect(result.district).toEqual(expected.district)
  })

  it('Return all my posts', async () => {
    const token = "1234"

    const res = await request(app.callback())
      .get('/api/v1/posts/me')     
      .set({ Authorization: token }) 
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.length).toBeLessThan(11)
    var result =  JSON.parse(JSON.stringify(res.body))[0]
    expect(result.about).toEqual(expected.about)
    expect(result.breedID).toEqual(expected.breedID)
    expect(result.companyCode).toEqual(expected.companyCode)
    expect(result.createdBy).toEqual(expected.createdBy)
    expect(result.createdByName).toEqual(expected.createdByName)
    expect(result.createdOn).toEqual(expected.createdOn)
    expect(result.cropImageBase64).toEqual(expected.cropImageBase64)
    expect(result.district).toEqual(expected.district)
    expect(result.districtId).toEqual(expected.districtId)
    expect(result.id).toEqual(expected.id)
    expect(result.imageBase64).toEqual(expected.imageBase64)
    expect(result.imageFilename).toEqual(expected.imageFilename)
    expect(result.petType).toEqual(expected.petType)
    expect(result.type).toEqual(expected.type)
    // expect(result.district).toEqual(expected.district)
  })


  it('Return all posts by image name', async () => {
    const token = "1234"

    const res = await request(app.callback())
      .get('/api/v1/posts/filter/inames?name=1656150994018.jpg&name=1657565257505.jpg')     
      .set({ Authorization: token }) 
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.length).toBeLessThan(11)
    var result =  JSON.parse(JSON.stringify(res.body))[0]
    expect(result.about).toEqual(expected.about)
    expect(result.breedID).toEqual(expected.breedID)
    expect(result.companyCode).toEqual(expected.companyCode)
    expect(result.createdBy).toEqual(expected.createdBy)
    expect(result.createdByName).toEqual(expected.createdByName)
    expect(result.createdOn).toEqual(expected.createdOn)
    expect(result.cropImageBase64).toEqual(expected.cropImageBase64)
    expect(result.district).toEqual(expected.district)
    expect(result.districtId).toEqual(expected.districtId)
    expect(result.id).toEqual(expected.id)
    expect(result.imageBase64).toEqual(expected.imageBase64)
    expect(result.imageFilename).toEqual(expected.imageFilename)
    expect(result.petType).toEqual(expected.petType)
    expect(result.type).toEqual(expected.type)
    // expect(result.district).toEqual(expected.district)
  })


  it('Return the specified posts', async () => {
    const res = await request(app.callback())
      .get('/api/v1/posts/36')      
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    var result =  JSON.parse(JSON.stringify(res.body))
    expect(result.about).toEqual(expected.about)
    expect(result.breedID).toEqual(expected.breedID)
    expect(result.companyCode).toEqual(expected.companyCode)
    expect(result.createdBy).toEqual(expected.createdBy)
    expect(result.createdByName).toEqual(expected.createdByName)
    expect(result.createdOn).toEqual(expected.createdOn)
    expect(result.cropImageBase64).toEqual(expected.cropImageBase64)
    expect(result.district).toEqual(expected.district)
    expect(result.districtId).toEqual(expected.districtId)
    expect(result.id).toEqual(expected.id)
    expect(result.imageBase64).toEqual(expected.imageBase64)
    expect(result.imageFilename).toEqual(expected.imageFilename)
    expect(result.petType).toEqual(expected.petType)
    expect(result.type).toEqual(expected.type)

  })



  it("create a new post and delete", async () => {
    const token = "1234"
    postSample.about = "testonly"
    const res = await request(app.callback())
      .post('/api/v1/posts')
      .set({ Authorization: token })
      .send(postSample)

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")

    const res2 = await request(app.callback()).get("/api/v1/posts?page=1&limit=1&about=testonly")
    expect(res2.statusCode).toEqual(200)
    expect(res2.type).toEqual("application/json")

    const res3 = await request(app.callback()).delete("/api/v1/posts/" + res2.body[0].id)

    expect(res3.statusCode).toEqual(201)
    expect(res3.type).toEqual("application/json")

    //var result = await model.deleteTest("test")
    //expect(result.status).toEqual(201)
  })

  it("update the post's information", async () => {
    const token = "1234"
    postSample.about = "aaaaaaaaaaaabbbb"
    const res = await request(app.callback())
      .put('/api/v1/posts/53')
      .set({ Authorization: token })
      .send(postSample)

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  })


  it("get the post's image load", async () => {
    const res = await request(app.callback())
      .get('/api/v1/posts/image/53')
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("image/jpg")


  })


})
