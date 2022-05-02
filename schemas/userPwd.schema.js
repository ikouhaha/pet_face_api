module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user_pwd",
    "title": "User Change password",
    "description": "A user changing in the system",
    "type": "object",
    "properties": {
        "password": {
            "description": "change user password",
            "type": "string",
            "minLength": 3,

        }
    },
    "required": [
        "password"
    ]

}
