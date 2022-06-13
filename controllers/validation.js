const {Validator,ValidationError} = require('jsonschema')
//const ValidationError  = require('sequelize/types')

const pet= require('../schemas/pet.schema.js')
const dog= require('../schemas/dog.schema.js')
const dogFilter = require('../schemas/dogFilter.schema.js')
const user = require('../schemas/user.schema.js')
const userProfile = require('../schemas/userProfile.schema.js')
const userGoogle = require('../schemas/userGoogle.schema.js')
const userPwd = require('../schemas/userPwd.schema.js')
const comment = require('../schemas/comment.schema.js')

const v = new Validator()


exports.validateDog = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,dog,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateDogFilter = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.query
    try{
        v.validate(body,dogFilter,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validatePet = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,pet,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateUser = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,user,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateUserProfile = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,userProfile,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateUserGoogle = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,userGoogle,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateUserPwd = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,userPwd,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateCompany = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,company,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}

exports.validateComment = async(ctx,next) => {
    const validationOptions = {
        throwError:true,
        allowUnknownAttributes:false
    }
    const body = ctx.request.body
    try{
        v.validate(body,comment,validationOptions)
        await next()
    }catch(error){
        if(error instanceof ValidationError){
            ctx.body = error
            ctx.status = 400
        }else{
            throw error
        }
    }
}


