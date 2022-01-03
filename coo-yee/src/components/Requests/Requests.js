import React,{useState,useEffect} from 'react';
import {motion} from 'framer-motion';
import "../LeaveStatus/LeaveStatus.css";
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
const Requests = ()=>{
    const [leaves,setLeaves] = useState([]);
    const [approved,setApproved]=useState(false);
    const [rejected,setRejected] = useState(false);
    const updateLeave = async (e)=>{
        const _id = e.target.id;
        const res = await fetch(`/leaverequest/${_id}`,{
            method:"PATCH",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({
              approved,rejected
            })
        
          });
        
    }
    useEffect(async ()=>{
        const data = await fetch("/leaverequest");
        const getLeaves = await data.json();
        setLeaves(getLeaves); 
    });
    return(
        <motion.div className="leave-status"
        variants = {containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit">
             <h1 style={{color:'tomato',textAlign:'center'}}>Requests</h1>   
            <div className="leaves">

                {leaves.map((leave)=>{
                    return(
                        <div className="leave">
                            <p>Request By : {leave.employee_name}</p>
                            <p>Requested on :   {leave.createdAt} </p><br />
                            <p>Requested Days : {leave.days}</p>
                            <button onClick={()=>{setApproved(true);setRejected(false)}} style={{backgroundColor:'green'}}>Approve</button>
                            <button onClick={()=>{setRejected(true);setApproved(false)}}style={{backgroundColor:'red'}}>Reject</button>
                            <button id={leave._id} onClick={updateLeave}>Submit</button>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    )
}
export default Requests;