const request = require('supertest')
const app = require('./common/index')
const helper = require('./common/helper')


const expected = {
  "_id": "6251d239cb156bbe336eb6e4",
  "name": expect.any(String),
  "about": expect.any(String),
  "breedID": expect.any(Number),
  "imageBase64": expect.any(String),
  "createdBy": 1,
  "companyCode": "7df96371-eac9-40b2-a734-1cf4a8ba433f",
  "id": 80,
  "breed": expect.any(Object),
  
}

const expectedInner = {
  "_id": "6251d239cb156bbe336eb6e4",
  "name": expect.any(String),
  "about": expect.any(String),
  "breedID": expect.any(Number),
  "imageBase64": expect.any(String),
  "createdBy": 1,
  "companyCode": "7df96371-eac9-40b2-a734-1cf4a8ba433f",
  "id": 80,
  "breed": expect.any(Object),
  "comments": expect.any(Array),
  "createBy": expect.any(Object)
}



describe('posts Testing Cases', () => {

  it('Return all posts', async () => {
    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/posts?page=1&limit=10')      
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.canCreate).toEqual(false)
    expect(res.body.totalCount).toEqual(expect.any(Number))
    expect(res.body.list.length).toBeLessThan(11)
    expect(res.body.list).toContainEqual(expected)

  })

  it('Return all posts and test staff action', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    //login with admin account , basic auth
    const res = await request(app.callback())
      .get('/api/v1/posts?page=1&limit=10')    
      .set({ Authorization: token })   
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.canCreate).toEqual(true)
    expect(res.body.totalCount).toEqual(expect.any(Number))
    expect(res.body.list.length).toBeLessThan(11)
    const newExpect = {...expected,canUpdate:true,canDelete:true,"isFavourite": expect.any(Boolean)}
    expect(res.body.list).toContainEqual(newExpect)

  })

  it('Return the specified posts', async () => {
    const res = await request(app.callback())
      .get('/api/v1/posts/80')      
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toEqual(expectedInner)

  })

  it('Return the specified posts and test staff action', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    const res = await request(app.callback())
      .get('/api/v1/posts/80')     
      .set({ Authorization: token }) 
      .send({})
    //ensure the staff have permission to edit
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    const newExpect = {...expectedInner,canUpdate:true,canDelete:true,"isFavourite": expect.any(Boolean)}
    expect(res.body).toEqual(newExpect)

  })

  it("create a new dog", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .post('/api/v1/posts')
      .set({ Authorization: token })
      .send({
        "name":"test",
        "about":"test",
        "imageBase64":"data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMSkkxBgAD2QFnQD1bxwAAAABJRU5ErkJggg==",
        "breedID":1,
        "createdBy":71,//staff id
        "companyCode":"7df96371-eac9-40b2-a734-1cf4a8ba433f"
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  })

  it("update the dog's information", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .put('/api/v1/posts/37')
      .set({ Authorization: token })
      .send({
        "name":"test",
        "about":"test update dog's information",
        "imageBase64":"data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMSkkxBgAD2QFnQD1bxwAAAABJRU5ErkJggg==",
        "breedID":1,
        "createdBy":71,//staff id
        "companyCode":"7df96371-eac9-40b2-a734-1cf4a8ba433f"
      })

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  })

  it("delete the dog", async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")
    
    const res = await request(app.callback())
      .del('/api/v1/posts/38/7df96371-eac9-40b2-a734-1cf4a8ba433f')
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual("application/json")
  })

  it("get the dog's image load", async () => {
    const res = await request(app.callback())
      .get('/api/v1/posts/image/71')
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("image/jpg")


  })


})
