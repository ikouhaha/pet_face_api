const db = require('../helpers/mongodb')


const collection = "breeds"


exports.getAllBreeds = async (type) => {

  let data = await db.run_aggregate("breeds", [{$match:{"type":type}},{ $group: { _id: "$name", name: { $max: "$name" }, value: { $max: "$id" } }},{$sort:{"id":1}}])
  return data
}

exports.getAllDistricts = async () => {

  let data = await db.run_aggregate("districts", [{ $group: { _id: "$name", name: { $max: "$name" }, value: { $max: "$id" } }},{$sort:{"id":1}}])
  return data
}










