

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config  = require('../config')


exports.isEmpty = (value) => {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

exports.getHash = (str) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(str, salt);
    return hash;
}

exports.genUUID = () => {
    return uuidv4()
}

exports.clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

exports.comparePwd = (pwd, hash) => {
    return bcrypt.compareSync(pwd, hash)
}

exports.createResponse = (ctx, code = 200, msg = "", data) => {

    ctx.status = code
    if (data) {
        ctx.body = { "message": msg, data: data }
    } else {
        ctx.body = { "message": msg, data: {} }
    }


}

exports.createErrorResponse = (ctx, ex, code = 500) => {
    if (ex.code == 11000) {
        let keys = Object.keys(ex.keyValue)
        let values = Object.values(ex.keyValue)
        keys = keys.join(',')
        ctx.status = code
        ctx.body = { "message": `The following ${keys}:${values} has been registered` }
    } else {
        ctx.status = code
        ctx.body = { "message": ex.message }
    }
}

//string to be like string
exports.filterPrepare = (filterData) => {
    let rv = this.clone(filterData);
    Object.keys(rv).map((key, index) => {
        if (typeof (rv[key]) == "string") {
            rv[key] = new RegExp(".*" + rv[key] + ".*")
        };
    });
    return rv;
}

exports.filterPrepare = (filterData) => {
    let rv = this.clone(filterData);
    Object.keys(rv).map((key, index) => {
        if (typeof (rv[key]) == "string") {
            rv[key] = new RegExp(".*" + rv[key] + ".*")
        };
    });
    return rv;
}


exports.getImgByBase64 = (str64) => {
    //const [, type] = str64.split(';')[0].split(':')
    var base64Data = str64.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, '')
    const image = Buffer.from(base64Data, "base64")
    
    var type 
    switch (base64Data.charAt(0)) {
        case "/":
            type="image/jpg"
            break;
        case "R":
            type="image/png"
            break;
        case "i":
            type="image/gif"
            break;
        case "P":
            type="image/jpeg"
            break;
        default:
            break;
    }

    return { type, image }
}


exports.JWTverify = (token, secret = config.SECRET) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })

    })

}

