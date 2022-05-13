module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user_profile",
    "title": "User profile",
    "description": "A user profile in the system",
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
        "about": {
            "description": "about the user",
            "type": "string"
        },
        "email": {
            "description": "Create user email",
            "type": "string",
            "format": "email"

        },
        "role": {
            "description": "the role of user",
            "type": "string",

        },
        "googleId": {
            "description": "for the google register user",
            "type": "string?"
        },
        "companyCode": {
            "description": "the company register code",
            "type": "string",

        },



    },
    "if": {
        "properties": {
            "role": { "const": "staff" }
        },
    },
    "then": {
        "required": ["companyCode", "email", "role"]
    },
    "else": {
        "required": ["email", "role"]
    }

}
