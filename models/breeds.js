const db = require('../helpers/mongodb')


const collection = "breeds"


exports.getAll = async () => {

  let data = await db.run_aggregate(collection, [{ $group: { _id: "$name", name: { $max: "$name" }, id: { $max: "$id" } } }])
  return data
}


exports.getById = async (id) => {
  let data = await db.run_one_query(collection, { 'id': parseInt(id) })
  return data
}






