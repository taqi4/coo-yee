import React,{useState,useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import {motion} from 'framer-motion';
import "./LeaveStatus.css";
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
const LeaveStatus = (props)=>{
    const history = useHistory();
    const [leaves,setLeaves] = useState([]);
    const [cookies,setCookies] = useCookies(['name']);
    useEffect(async ()=>{
        if(!props.isLoggedIn){
            history.push("/logout");
        }
        const data = await fetch(`/leaverequest/${cookies.user_id}`);
        const getLeaves = await data.json();
        setLeaves(getLeaves); 
    });
    return(
        <motion.div className="leave-status"
        variants = {containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit">
        
            <div className="leaves">
                {leaves.map((leave)=>{
                    return(
                        <div className="leave">
                            <p>Requested on :   {leave.createdAt} </p><br />
                            <p>Requested Days : {leave.days}</p>
                            <p>Status       :   {leave.approved ? "accepted" : leave.rejected ? "Rejected" : "pending.."}</p>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    )
}
export default LeaveStatus;