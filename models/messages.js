const db = require('../helpers/mongodb')


const collection = "messages"

exports.getAll = async function () {
  let data = await db.run_query(collection, {})
  return data
}


exports.getUserByRoomId = async function (id) {
  let data = await db.run_one_query(collection, { 'roomId': id })

  if(data){
    return data.user
  }

  return null
}

exports.getStaffByRoomId = async function (id) {
  let data = await db.run_one_query(collection, { 'roomId': id })

  if(data){
    return data.staff
  }

  return null
}






exports.getAllPendingCount = async function (query={}) {
  let data = await db.run_count(collection, query)
  return data
}


exports.getFirstAvailableMessage = async function (query={}) {
  let data = await db.run_query(collection, query,{sort:{'id':1}})

  if(data.length){
    return data[0]
  }
  return null
}

exports.getNextRoomID = async function () {
  let data = await db.run_query(collection, {},{sort:{'id':-1}})

  if(data.length){
    return data[0].id + 1
  }
  return 1 //init
}



exports.getMessageByRoomId = async function (roomId) {
  let data = await db.run_one_query(collection, { 'roomId': roomId })
  return data
}



exports.getAllByFilter = async function (query,{page, limit,order="id",sorting=-1}) {
  let data = await db.run_query(collection,query, {
    skip:(page-1)*limit,
    sort:{
      [order]:sorting
    },
    limit:limit,
    
  })
  return data
}

exports.getById = async function (id) {
  let data = await db.run_one_query(collection, { 'roomId': id })
  return data
}

exports.update = async function (id,document) {
  let data = await db.run_update(collection,{ 'roomId': id }, document)
  return data
}


exports.add = async function (document) {
  let status = await db.run_insert(collection, document)
  return status
}

// exports.add = async function (document) {
//   let status = await db.run_insert(collection, document)
//   return status
// }

