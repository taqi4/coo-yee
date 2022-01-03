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
    leave : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'leaveRequest'

    }

});

const admins = new mongoose.model("admin",userSchema);

module.exports = admins;