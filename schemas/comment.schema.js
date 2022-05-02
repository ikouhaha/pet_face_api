module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/comment",
    "title": "Comment",
    "description": "Comment's information",
    "type": "object",
    "properties": {
        "dogId":{
            "description": "The id of dog",
            "type": "integer"
        },
        "userId":{
            "description": "The user id of comment , null if public user",
            "type": "integer"
        },
        "comment": {
            "description": "The comment of dog",
            "type": "string"
        },
        "commentDate": {
            "description": "The create date of comment",
            "type": "date"
        }
    },
    "required": ["dogId", "comment"]
}
