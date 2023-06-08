
const mongoose = require('mongoose')
const validator = require('validator')


const salesorderSchema = new mongoose.Schema({
    cname:{
        type:String,
        required:true,
        trim:true
    },
    companyname:{
        type:String,
        required: true,
        trim:true
    },
    mobile: {
        type: String,
        required: true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    email:{
        type: String,
        required:true,
        unique:true,
        validate(value){
            if(validator.isEmail(value)){
                throw Error("Not a valid email!!")
            }
        }
    },
    gst:{
        type:String,
        required:true,
        unique:true
    },
    requiredService:{
        type:String,
        required:true,
    },
    qty:{
        type: String,
        required: true
    },
    approximateValue:{
       type:String,
       required:true
    }



})


const salesorder = new mongoose.model("salesorder",salesorderSchema)

module.exports = salesorder