module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/pet",
    "title": "Pet",
    "description": "dog's information",
    "type": "object",
    "properties": {
        "name":{
            "description": "The name of pet",
            "type": "string",
            "minLength": 1,
        },
        "about":{
            "description": "The description of pet",
            "type": "string"
        },
        "imageBase64":{
            "description": "The base64 format of image",
            "type": "string"
        },
        "cropBase64":{
            "description": "The base64 format of image",
            "type": "string"
        },
        "breedID":{
            "description": "The breed id of pet",
            "type": "integer"
        },
        "createdBy":{
            "description": "The pet information create by",
            "type": "integer?"
        },
    },
    "required": ["name"]
}
