module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/post",
    "title": "post",
    "description": "dog's information",
    "type": "object",
    "properties": {
        "type":{
            "description": "The type of post",
            "type": "string",
            "minLength": 1,
        },
        "about":{
            "description": "The description of post",
            "type": "string"
        },
        "imageBase64":{
            "description": "The base64 format of image",
            "type": "string"
        },
        "cropImageBase64":{
            "description": "The base64 format of head crop image",
            "type":"string"
        },
        "breedID":{
            "description": "The breed id of post",
            "type": "integer"
        },
        "createdBy":{
            "description": "The post information create by",
            "type": "integer"
        },
        "companyCode":{
            "description": "The company code of post if it is a company post",
            "type": "string?"
        },
        "imageFilename":{
            "description": "The imageFilename that saved in server",
            "type": "string"
        },
        "districtId":{
            "description": "The district id in hong kong",
            "type": "integer"
        }
    },
    "required": ["type","imageBase64","imageFilename","districtId"]
}
