const mongoose = require('mongoose');
const express = require('express');
 
const userSchema = new mongoose.Schema({
    firstname: {
        type : String,
        required : true,
        trim : true
    },
    lastname: {
        type : String,
        required: true,
        trim: true
    },
    mobileNumber : {
        type:Number,
        unique : true,
        required:true
    },
    email: {
        type:String,
        unique : true,
        required:true
    },
    role:{
        type : String,
        required : true,
        trim: true
    },
    employee_id:{
        type:Number,
        required : true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    leaves :[ {
       
        days:{
            type:Number
        },
        reason:{
            type:String
        },leaveDate:{
             type:Date,
             default:Date.now()
        }
       
    }
    ]
    

});

const users = new mongoose.model("user",userSchema);

module.exports = users;