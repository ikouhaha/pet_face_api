const db = require('../helpers/mongodb')


const collection = "posts"

exports.getAll = async function (page, limit, order) {
  let data = await db.run_query(collection, {})
  return data
}




exports.getAllCount = async function (query={}) {
  let data = await db.run_count(collection, query)
  return data
}


exports.getAllByFilter = async function (query,{unlimited=false,page, limit,order="id",sorting=-1}) {
  let data;
  if(unlimited){
     data = await db.run_aggregate(collection, [
      { $match:query},
      //{$unwind:"$post"},
      {$lookup:{from:"breeds",localField:"breedID",foreignField:"id",as:"breed"}},
      {$lookup:{from:"users",localField:"createdBy",foreignField:"id",as:"createBy"}},
      {$lookup:{from:"districts",localField:"districtId",foreignField:"id",as:"district"}},
      {$unwind:{path:"$breed",preserveNullAndEmptyArrays:true}},
      {$unwind:{path:"$createBy",preserveNullAndEmptyArrays:true}},
      {$unwind:{path:"$district",preserveNullAndEmptyArrays:true}},
      {$project:{_id:0,id:1,about:1,breedID:1,createdBy:1,imageBase64:1,cropImageBase64:1,createdOn:1
        ,type:1,companyCode:1,imageFilename:1,petType:1,districtId:1,breed:"$breed.name",createdByName:"$createBy.displayName","district":"$district.name"}},
      { $sort: { [order]: sorting } },     
      
    ])
  
  }else{
    data = await db.run_aggregate(collection, [
      { $match:query},
      //{$unwind:"$post"},
      {$lookup:{from:"breeds",localField:"breedID",foreignField:"id",as:"breed"}},
      {$lookup:{from:"users",localField:"createdBy",foreignField:"id",as:"createBy"}},
      {$lookup:{from:"districts",localField:"districtId",foreignField:"id",as:"district"}},
      {$unwind:{path:"$breed",preserveNullAndEmptyArrays:true}},
      {$unwind:{path:"$createBy",preserveNullAndEmptyArrays:true}},
      {$unwind:{path:"$district",preserveNullAndEmptyArrays:true}},
      {$project:{_id:0,id:1,about:1,breedID:1,createdBy:1,imageBase64:1,cropImageBase64:1,createdOn:1
        ,type:1,companyCode:1,imageFilename:1,petType:1,districtId:1,breed:"$breed.name",createdByName:"$createBy.displayName","district":"$district.name"}},
      { $sort: { [order]: sorting } },
      { $skip: (page-1)*limit },
      { $limit: limit },
      
    ])
  
  }
 

  return data
}

exports.getById = async function (id) {
  let data = await db.run_one_query(collection, { 'id': parseInt(id) })
  return data
}

exports.getById = async function (id) {
  let data = await db.run_aggregate(collection, [
    { $match:{id:id}},
    //{$unwind:"$post"},
    {$lookup:{from:"breeds",localField:"breedID",foreignField:"id",as:"breed"}},
    {$lookup:{from:"users",localField:"createdBy",foreignField:"id",as:"createBy"}},
    {$lookup:{from:"districts",localField:"districtId",foreignField:"id",as:"district"}},
    {$unwind:{path:"$breed",preserveNullAndEmptyArrays:true}},
    {$unwind:{path:"$createBy",preserveNullAndEmptyArrays:true}},
    {$unwind:{path:"$district",preserveNullAndEmptyArrays:true}},
    {$project:{_id:0,id:1,about:1,breedID:1,createdBy:1,imageBase64:1,cropImageBase64:1,createdOn:1
      ,type:1,companyCode:1,imageFilename:1,petType:1,districtId:1,breed:"$breed.name",createdByName:"$createBy.displayName","district":"$district.name"}} 
    
  ])

  if(data.length){
    return data[0]
  }

  return null
}

exports.delete = async function (id) {
  let data = await db.run_delete(collection, { 'id': parseInt(id) })
  return data
}

exports.update = async function (id,document) {
  let data = await db.run_update(collection,{ 'id': parseInt(id) }, document)
  return data
}


exports.add = async function (document) {
  let status = await db.run_insert(collection, document)
  return status
}

