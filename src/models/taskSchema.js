const mongoose = require('mongoose');
const express = require('express');

const taskSchema = new mongoose.Schema({
title :{
    type:String,
    required:true
},
createdAt:{
    type:Date,
    default:Date.now()
},
createdBy:{
    type:String,
    required:true
},
description :{
    type : String,

},
deadline:{
    type : Date

},
progress:{
    type:Number,
    default:0
},
updates:[
    {
        updateBy:{
            type: String
    
        },
        update:{
            type:String
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
],
assignedTo: Array


});
const tasks = new mongoose.model("task",taskSchema);
module.exports = tasks;