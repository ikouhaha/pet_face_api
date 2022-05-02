const mongoClient = require("mongodb").MongoClient
const config = require('../config')
const mongo_username = config.DB_USER
const mongo_password = config.DB_PWD

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@${config.DB_HOST}`
const DATABASE_NAME = config.DB_NAME
const util = require('../helpers/util')



exports.run_query = async (collection, query = {}, options = { projection: null, sort: null, skip: null, limit: null }) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).find(query, options)
  let returnResult = await result.toArray()
  await dbClient.close()
  return returnResult

}

exports.run_count = async (collection, query = {}) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).count(query)
  let returnResult = result
  await dbClient.close()
  return returnResult

}

exports.run_aggregate = async (collection, options = [{ $sort:{} }, { $group }, { $lookup }, { $limit }, { $skip }, { $match },{$lookup},{$unwind}]) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).aggregate(options)
  let returnResult = await result.toArray()
  await dbClient.close()
  return returnResult

}



exports.run_one_query = async (collection, query) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).findOne(query)

  let returnResult = await result
  await dbClient.close()
  return returnResult
}

exports.run_insert = async (collection, document) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const seq = await _getNextSequenceValue(dbClient, collection)
  document.id = seq
  const result = await dbClient.db(DATABASE_NAME).collection(collection).insertOne(document)
  await dbClient.close()
  return { "status": 201, "message": "Data insert successfully" }
}

exports.run_update = async (collection, query, document) => {
  let cloneDoc = util.clone(document);
  if ('_id' in cloneDoc) {
    delete cloneDoc._id;
  }

  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).updateOne(
    query,
    { $set: cloneDoc }
  )
  await dbClient.close()
  return { "status": 201, "message": `${result.modifiedCount} Data update successfully` }
}

exports.run_delete = async (collection, query) => {

  const dbClient = await mongoClient.connect(CONNECTION_URI)
  const result = await dbClient.db(DATABASE_NAME).collection(collection).deleteOne(query)
  await dbClient.close()
  return { "status": 201, "message": `${result.deletedCount} data delete successfully` }
}

exports.run_insert_many = async (collection, document) => {
  const dbClient = await mongoClient.connect(CONNECTION_URI)

  for (const index in document) {
    const seq = await _getNextSequenceValue(dbClient, collection)
    document[index].id = seq
  }

  await dbClient.close()
  return { "status": 201, "message": "Data insert successfully" }
}


//get next id from collection
_getNextSequenceValue = async (dbClient, sequenceName) => {
  var sequenceDocument = await dbClient.db(DATABASE_NAME).collection("counters").findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnNewDocument: true, upsert: true }

  );
  return sequenceDocument.value.sequence_value;
}




