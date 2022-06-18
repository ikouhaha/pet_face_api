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
  "canDelete": false,
  "canUpdate": false,
  "isFavourite": expect.any(Boolean),
}




describe('posts Testing Cases', () => {

  it('Return all posts by users favourites ', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha888", "123")     
    const res = await request(app.callback())
      .get('/api/v1/favourites?page=1&limit=10')     
      .set({ Authorization: token }) 
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body.canCreate).toEqual(false)
    expect(res.body.totalCount).toEqual(expect.any(Number))
    expect(res.body.list.length).toBeLessThan(11)
    expect(res.body.list).toContainEqual(expected)

  })


  it('like the dog testing', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha888", "123")     
    const res = await request(app.callback())
      .put('/api/v1/favourites/78/true')     
      .set({ Authorization: token }) 
      .send({})

    expect(res.statusCode).toEqual(201)

  })

  it('check the result after like', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha888", "123")     
    const res = await request(app.callback())
      .get('/api/v1/posts/78')     
      .set({ Authorization: token }) 
      .send({})
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.isFavourite).toEqual(true)
  })
  

  it('unlike the dog testing', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha888", "123")     
    const res = await request(app.callback())
      .put('/api/v1/favourites/78/false')     
      .set({ Authorization: token }) 
      .send({})

    expect(res.statusCode).toEqual(201)

  })

  it('check the result after unlike', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha888", "123")     
    const res = await request(app.callback())
      .get('/api/v1/posts/78')     
      .set({ Authorization: token }) 
      .send({})
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.isFavourite).toEqual(false)
  })


 

})
