

module.exports.getLoginToken = async (request,username,pwd) => {
    let res = await request.post('/api/v1/auth')
    .auth(username, pwd)
    .send({})
    return res.text
}