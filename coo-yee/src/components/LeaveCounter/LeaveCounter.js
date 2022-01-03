import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import { useCookies } from 'react-cookie';
import "./LeaveCounter.css";
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
const LeaveCounter = ()=>{
    const [employees,setEmployees] = useState([]);
    
    useEffect(async()=>{
         const res = await fetch("/allemployees");
         const allEmployees = await res.json();
         setEmployees([allEmployees]);
         
    });

    return(
        <motion.div className="leave-counter" 
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit">
         {employees.map((employee)=>{
            return employee.map((remployee)=>{
                let sum=1-1;return(
                <div className="employee" key={remployee._id}>
                    <h3>Employee Name: {remployee.firstname} {remployee.lastname} </h3>
                    <p><strong>No. of leaves </strong> {remployee.leaves.map((leave)=>{sum = sum+leave.days})}{sum}</p>
                </div>
            );})
            
         })}
        </motion.div>
    );
}
export default LeaveCounter;