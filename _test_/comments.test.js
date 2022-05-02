const request = require('supertest')
const app = require('./common/index')
const helper = require('./common/helper')



const expected = {
  "_id": "626e8af689d8d2810cba7826",
  "dogId": 78,
  "comment": "test",
  "userId": 71,
  "commentDate": "2022-05-01T13:28:21.959Z",
  "id": 26,
  "user": expect.any(Object),  
  "author": expect.any(String),
  "avatar": expect.any(String),
  "datetime": "2022-05-01T13:28:21.959Z"
}




describe('Comments Testing Cases', () => {

  it('Return all comments of the dog ', async () => {
         
    const res = await request(app.callback())
      .get('/api/v1/comments/78')          
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    expect(res.body).toContainEqual(expected)

  })

  it('Return all comments of the dog and test staff can delete', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha999", "123")     
    const res = await request(app.callback())
      .get('/api/v1/comments/78')          
      .set({ Authorization: token })
      .send({})

    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")
    const newExpected = {...expected,canDelete:true}
    expect(res.body).toContainEqual(newExpected)

  })


  it('create the dog testing', async () => {
    const token = await helper.getLoginToken(request(app.callback()), "ikouhaha888", "123")     
    const res = await request(app.callback())
      .post('/api/v1/comments')     
      .set({ Authorization: token }) 
      .send({
        "dogId": 78,
        "userId": 188,
        "comment": "test comment",
        
        })

    expect(res.statusCode).toEqual(201)

  })

})
