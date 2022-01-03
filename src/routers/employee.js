const express = require('express');
const router = new express.Router();
const Employee = require('../models/employeeSchema');  
const Admin  = require('../models/adminSchema');
const Task = require('../models/taskSchema');
const LeaveRequest = require("../models/leaveSchema");
const bcrypt = require('bcryptjs');

router.get("/gettask",async(req,res)=>{
   try{
        const Tasks = await Task.find({}).where('progress').lt(100).sort({deadline:0});
        res.status(200).send(Tasks);
   } catch(e){
       res.send(`<h1>${JSON.stringify(e)}</h1>`).status(404);
   }   
});
router.get("/task/:_id",async(req,res)=>{
    try{
        
        const _id = req.params._id;
        const getTask = await Task.findOne({_id:_id});
        res.send(getTask).status(200);
    }catch(e){
        res.status(404).send(e);
        console.log(e);
    }
})
router.get("/getallemployees",async(req,res)=>{
try{
    const Employees = await Employee.find({},{firstname:1});
    res.status(200).send(Employees);
}catch(e){
    res.status(401).send(e);
    console.log(e);
}
});
router.get("/allemployees",async(req,res)=>{
 try{
   const Employees = await Employee.find({}).sort({employee_id:0});
   res.send(Employees).status(200);
 }catch(e){
  res.status(401).send(e);
 }
});
router.post("/signup",async (req,res)=>{
    console.log(req.body);
  const {firstname,lastname,email,mobileNumber,employee_id,role,password,cpassword} = req.body;
  try{
      const userExist = await Employee.findOne({email:email});
      if(userExist){
          return res.status(403).send("copy cat huh");
      }
  if(!firstname||!lastname||!email||!mobileNumber||!employee_id||!role||!password||!cpassword){
      res.status(400).send("all fields are compulsary to fill");
  }
  else if(password != cpassword){
      res.status(401).send("password and confirm password are not same");
  }
  else{
    const encryptedPassword = await bcrypt.hash(password, 10);
    const addEmployee = new Employee({firstname:firstname,lastname:lastname,email:email,mobileNumber:mobileNumber,employee_id:employee_id,role:role,password:encryptedPassword,cpassword:encryptedPassword});
    const  insertEmployee = await addEmployee.save();
    res.status(200).send("registered successfuly");
  }
}catch(e){
    console.log(e);
    res.status(404).send(e);
}

});
router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const isUser = await Employee.findOne({email:email});
        if(!email||!password){
           return res.status(410).send("fill all details");
        }
        
        
        if(!isUser){
            return res.status(401).send("invaild credentials");
        }
        else{

            if(await !bcrypt.compare(password, isUser.password)||isUser.password!=password){
                 return res.status(420).send("inavalid credentials");
            }else{
                 return res.status(200).send(isUser);
                
            }
        }

    }
    catch(e){
        console.log(e);
        res.status(404).send(e);
    }
});
router.post("/adminsignup",async (req,res)=>{
    console.log(req.body);
  const {firstname,lastname,email,mobileNumber,employee_id,role,password,cpassword} = req.body;
  try{
      const userExist = await Admin.findOne({email:email});
      if(userExist){
          return res.status(403).send("copy cat huh");
      }
  if(!firstname||!lastname||!email||!mobileNumber||!employee_id||!role||!password||!cpassword){
      res.status(400).send("all fields are compulsary to fill");
  }
  else if(password != cpassword){
      res.status(401).send("password and confirm password are not same");
  }
  else{
    const encryptedPassword =await bcrypt.hash(password,10);
    const addAdmin = new Admin({firstname:firstname,lastname:lastname,email:email,mobileNumber:mobileNumber,employee_id:employee_id,role:role,password:encryptedPassword,cpassword:encryptedPassword});
    const  insertAdmin = await addAdmin.save();
    res.status(200).send("registered successfuly");
  }
}catch(e){
    console.log(e);
    res.status(404).send(e);
}

});

router.post("/adminsignin",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const isUser = await Admin.findOne({email:email});
        if(!email||!password){
           return res.status(410).send("fill all details");
        }
        
        
        if(!isUser){
            return res.status(401).send("invaild credentials");
        }
        else{

            if(password!=isUser.password || await !bcrypt.compare(password,isUser.password)){
                 return res.status(420).send("inavalid credentials");
            }else{
                 return res.status(200).send(isUser);
            }
        }

    }
    catch(e){
        console.log(e);
        res.status(404).send(e);
    }
});

router.post("/createtask", async(req,res)=>{
try{
  const {title,description,deadline,createdBy,progress,assignedTo} = req.body;
  const createTask = new Task({title:title,description:description,deadline:deadline,createdBy:createdBy,progress:progress,assignedTo:assignedTo});
  const insetTask = await createTask.save();
  res.status(200).send("task created");
}
catch(e){
    res.status(404).send(e);
}
});
router.patch("/updatetask",async(req,res)=>{
try{
    const {_id,updateBy,update,progress} = req.body;
    const updateTask = await Task.findByIdAndUpdate({_id:_id},{progress:progress,
        $push :{
            updates :{
                updateBy:updateBy,
                update:update
            }
        }
    });
    res.status(200).send("task updated");

}catch(e){
    console.log(e);
    res.status(404).send(e);
}
 } );
 router.post("/leaverequest",async (req,res)=>{
try{
  const {employee_id,employee_name,reason,days} = req.body;
  const leave = new LeaveRequest({employee_id,employee_name,reason,days});
  const insertLeave = await leave.save();
  res.status(200);
}catch(e){
  res.status(400).send(e);
}
 });
router.get("/leaverequest",async(req,res)=>{
try{
    const leave = await LeaveRequest.find({approved:false,rejected:false});
    res.status(200).send(leave);
}catch(e){
    res.status(400).send(e);
}
});
router.get("/leaverequest/:_id",async(req,res)=>{
try{
    const _id = req.params._id;
    const leave  = await LeaveRequest.find({employee_id:_id}).sort({createdAt:1});
    res.status(200).send(leave);
}catch(e){
    res.status(400).send(e);
}
});
router.patch("/leaverequest/:_id",async(req,res)=>{
try{
  const _id = req.params._id;
  const {approved,rejected} = req.body;
  const leaveResponse = await LeaveRequest.findByIdAndUpdate({_id:_id},{
      approved:approved,
      rejected:rejected
  });
  res.status(200);
  const leave = await LeaveRequest.findById({_id:_id});
  const employee_id = leave.employee_id;
  if(approved){
    const empLeave = await Employee.findByIdAndUpdate({_id:employee_id},{
        $push : {
            leaves:{
               days:leave.days,
               reason:leave.reason
            }
        }
    });
    
  }
}catch(e){
    res.status(400).send(e);
    console.log(e);
}
});
module.exports =router;


//imp for leave
//var d= new Date();
//var f = new Date(`${d.getMonth()},01, 2021`);          
//db.bios.find( { birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') } } )
