const db = require('../helpers/mongodb')
const util = require('../helpers/util')

const collection = "users"

exports.findByUsername = async function (username) {
  let data = await db.run_query(collection, {'username': username})
  return data
}

exports.findByFID =  async function (fid) {
  let data = await db.run_one_query(collection, {'fid': fid})
  return data
}

exports.getUserById = async function (id){
  let data = await db.run_query(collection, {'id': parseInt(id)})
  return data
}

exports.findByEmail = async function (email) {
  let data = await db.run_one_query(collection, {'email': email})
  return data
}

exports.findByGoogleId = async function (id) {
  let data = await db.run_one_query(collection, {'googleId': id})
  return data
}


exports.getAll = async function () {
  let data = await db.run_query(collection, {})
  return data
}

exports.getById = async function (id) {
  let data = await db.run_one_query(collection, {'id':id})
  return data
}


exports.createUser = async function (user) {
  //structuring the data
  user.favourites = user.favourites|| {}
  let status = await db.run_insert(collection, user)
  return status
}

exports.updateUser = async function (id,user){
  let status = await db.run_update(collection,{ 'id': parseInt(id) }, user)
  return status
}

exports.deleteUser = async function (email){
  let status = await db.run_delete_many(collection, { 'email': email })
  return status
}
