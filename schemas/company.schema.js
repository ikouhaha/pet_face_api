module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/company",
    "title": "Company",
    "description": "Company's information",
    "type": "object",
    "properties": {
        "name":{
            "description": "The name of charity/company ",
            "type": "string"
        },
        "phone":{
            "description": "The phone of charity/company",
            "type": "string"
        },
        "email":{
            "description": "The email of charity/company",
            "type": "string",
            "format":"email"
        },
        "address":{
            "description": "The address of charity/company",
            "type": "string",
        }
      

    },
    "required": ["name", "phone", "email","address"],
    //"not": { "required": [ "code" ] }


}
