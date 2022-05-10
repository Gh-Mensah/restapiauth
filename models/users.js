const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//create news Schema and model
const UserSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true
    },
    programming_language:{
        type:String,
    },
    native_language:{
        type:String,
    },
    country:{
        type:String,
    },
    password:{
        type:String,
        required:true
    }
})


const Users = mongoose.model('news',UserSchema)


module.exports= Users