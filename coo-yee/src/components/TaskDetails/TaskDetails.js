import React, { useEffect, useState } from 'react';
import {Link,useHistory,useLocation} from 'react-router-dom';
import "./TaskDetails.css";
import {motion} from 'framer-motion';
const containerVariant ={
    hidden:{
        scale:0,
        x:'100vw'
    },
    visible:{
        scale:1,
        x:0,
        transition:{
            type:'spring',
            stiffness:150,
            damping:10,
            mass:1
        }
    },
    exit:{
        scale:0,
        x:'-100vw',
        transition:{
            ease:'easeInOut'
        }
    }
}   

const TaskDetails = ()=>{
    const location = useLocation();
    const history = useHistory();
    const [task,setTask] =useState();
    
   useEffect(async ()=>{
       const _id = location.state._id;
    const res =await fetch(`/task/${_id}`);
    const Task = await res.json();
    if(!Task){
        window.alert("Task details not available");
        history.push("/");
    }
    setTask({...Task});
    console.log(Task);
    console.log(task);
   });   
   
   console.log(task);
    return(<motion.div className="task-details"
    variants={containerVariant}
    initial="hidden"
    animate="visible"
    exit="exit">
      <h2 className="heading">{task ? task.title : "fetching .."}</h2>
      <h4 className="description">Description: {task? task.description : "fetching..."}</h4>
      <ul>Assigned To : 
          {task? task.assignedTo.map((assigned)=>{
              
              return(<li key={task.firstname} className="assigned">{assigned}</li>);
          }): "fetching..."}
      </ul>
      <h3>Updates : </h3>
      {task ? task.updates.map((Update)=>{
        return( <div className="update" key={Update._id}>
             <p className="date">updated at :  {Update.updatedAt}</p>
             <h4>update Description :   {Update.update}</h4>
             <p className="updateby">Updated by :  {Update.updateBy}</p>
         </div>)
      }): "fetching.. "}
    </motion.div>);
}
export default TaskDetails;