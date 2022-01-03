import React,{useState,useEffect,useContext} from 'react';
import Logout from '../Login/Logout';
import {motion} from 'framer-motion';
import {Link,useHistory} from 'react-router-dom';
import "../AddTask/AddTask.css";
import {useCookies} from 'react-cookie';
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
const RequestLeave = (props) =>{
  const history = useHistory();
  useEffect(function(){
      if(!props.isLoggedIn){
          history.push("/logout");
      }
    })
    const [crTask,setCrTask] = useState({days:"",reason:""});
    const [cookies,setCookie] = useCookies(['name']);
    const handelInput=(e)=>{
        let name = e.target.name;
        let dalue =e.target.value;
        setCrTask({...crTask,[name]:dalue});
        
       }
    
  const CreateTask = async(e) =>{
      const employee_id = cookies.user_id;
      const employee_name=cookies.username;
      const {days,reason} = crTask;

    const res = await fetch("/leaverequest",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          employee_id,employee_name,days:parseInt(days),reason
        })
    
      });
      if(res.status === 200){
          window.alert("leave requested");
      }
      else if(res.status === 400){
          window.alert("leave not requested");
      }
      else{
          window.alert("unknown error");
      }

  }
     return ( 
 <motion.div className = "add-task"
 variants = {containerVariant}
 initial = "hidden"
 animate="visible"
 exit="exit"
    
    
 >
  <div className="login-box">
  <h2>Request Leave</h2>
  <form method="POST" onSubmit={CreateTask} id="form">
    <div className="user-box">
      <input type="number" name="days" onChange={handelInput}  />
      <label>Days</label>
    </div>
    <div className="user-box">
      <input type="text" name="reason" onChange={handelInput} />
      <label>Reason</label>
    </div>
    
    <Link  onClick={CreateTask}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Request Leave
      
    </Link>
   
  </form>
</div>   
 </motion.div>);
}

export default RequestLeave; 