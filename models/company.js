const db = require('../helpers/mongodb')
const util = require('../helpers/util')

const collection = "companies"

exports.findByCode = async function (code) {
  let data = await db.run_one_query(collection, {'code': code})
  return data
}

exports.getAll = async function () {
  let data = await db.run_query(collection, {})
  return data
}


exports.createCompany = async function (company) {
  let status = await db.run_insert(collection, company)
  return status
}

