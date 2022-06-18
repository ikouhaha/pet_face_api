const db = require('../helpers/mongodb')


const collection = "breeds"


exports.getAll = async (type) => {

  let data = await db.run_aggregate(collection, [{$match:{"type":type}},{ $group: { _id: "$name", name: { $max: "$name" }, id: { $max: "$id" } }},{$sort:{"id":1}}])
  return data
}


exports.getById = async (id) => {
  let data = await db.run_one_query(collection, { 'id': parseInt(id) })
  return data
}






