const mongoose = require('mongoose');
const express = require('express');

const leaveSchema = new mongoose.Schema({
    employee_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required : true
    },
    employee_name:{
        type:String

    },
    approved:{
        type:Boolean,
        default: false
    },
    rejected:{
        type:Boolean,
        default:false
    },
    reason:{
        type:String ,
        required : true,
    
    },
    days:{
        type:Number
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});
const leaveRequests = new mongoose.model("leaveRequest",leaveSchema);
module.exports = leaveRequests;