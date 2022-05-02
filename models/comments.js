const db = require('../helpers/mongodb')



const collection = "comments"

exports.getAll = async function () {
  let data = await db.run_query(collection, {})
  return data
}

exports.getByDogId = async function (id) {

  let data = await db.run_aggregate(collection, [
    { $lookup: { from: "users", localField: "userId", foreignField: "id", as: "user" } },

    { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },

    { $match: { 'dogId': parseInt(id) } }
  ])

  //let data = await db.run_query(collection, { 'dogId': parseInt(id) })
  return data
}

exports.add = async function (document) {
  let status = await db.run_insert(collection, document)
  return status
}


exports.delete = async function (id) {
  let status = await db.run_delete(collection, {id:parseInt(id)})
  return status
}