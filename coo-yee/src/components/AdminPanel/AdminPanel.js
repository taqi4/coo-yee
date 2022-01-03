import React, { useEffect } from 'react';
import {motion } from 'framer-motion';
import {Link,useHistory} from 'react-router-dom';

import "./AdminPanel.css"
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
  
const AdminPanel = (props) =>{
const history= useHistory();   
   
    useEffect(()=>{
     if(!props.isLoggedIn){
         history.push('/adminlogin');
     }
    });
    return props.isLoggedIn ? (
        <motion.div className ="admin-panel"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit">
             <div className="login-box">
  
  <form   id="form">
    <Link  to="/addtask">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Create Task
      
    </Link>
    <Link  to="/registeradmin">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Add Admin      
    </Link>
    </form>
    </div>
        </motion.div>
    ):(
        <div>Please login first</div>

    )
}
export default AdminPanel;