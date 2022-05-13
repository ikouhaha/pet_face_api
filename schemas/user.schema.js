module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user",
    "title": "User",
    "description": "A user in the system",
    "type": "object",
    "properties": {
        "firstName": {
            "description": "The user's first name",
            "type": "string"
        },
        "lastName": {
            "description": "The user's last name",
            "type": "string"
        },
        "username": {
            "description": "The user's unique account name in the system",
            "type": "string",
            "minLength": 1,
        },
        "about": {
            "description": "about the user",
            "type": "string"
        },
        "password": {
            "description": "Create user password",
            "type": "string",
            "minLength": 3,

        },
        "email": {
            "description": "Create user email",
            "type": "string",
            "format": "email"

        },
        "avatarUrl": {
            "description": "The avatar url of the user",
            "type": "string",
            "format": "uri",
            "pattern": "^(https?|wss?|ftp)://"

        },
        "role": {
            "description": "the role of user",
            "type": "string",

        },
        "googleId": {
            "description": "for the google register user",
            "type": "string"
        },
        "companyCode": {
            "description": "the company register code",
            "type": "string",

        },
        "favourites": {
            "description": "save favourite pets",
            "type": "object",

        },


    },
    "if": {
        "properties": {
            "role": { "const": "staff" }
        },
    },
    "then": {
        "required": ["companyCode", "username", "password", "email", "role"]
    },
    "else": {
        "required": ["username", "password", "email", "role"]
    }

}
