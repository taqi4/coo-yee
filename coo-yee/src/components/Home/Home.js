import React,{useContext, useEffect,useState} from 'react';
import {motion} from 'framer-motion';
import {Link,useHistory} from 'react-router-dom';
import UserContext from '../../UserContext';
import "./Home.css";
import Login from '../Login/Login';
import {useCookies} from "react-cookie";
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
    

const Home =  (props)=>{
    const [please,setPlease] = useState([]);
    const {value,setValue} =useContext(UserContext);
    const [cookies,setCookies] = useCookies(['name']);
        useEffect(async ()=>{
    
        const res = await fetch("/gettask");
        const Tasks = await res.json();
          const filteredTask = Tasks.filter((Task)=>{
        if(props.isAdmin===true){
           return true;
          }
         else if(Task.assignedTo.includes(value)){
             return true;
         }
         else if(Task.createdBy === value){
             return true;
         }   
         else{
             return false;
         }

        });
          setPlease(filteredTask);
    },[]);
    
    const [upTask,setUpTask]=useState({update:"",progress:""});
    const handelInput=(e)=>{
     let name = e.target.name;
     let dalue =e.target.value;
     setUpTask({...upTask,[name]:dalue});
     
    }
    const updateTask = async(e)=>{
        e.preventDefault();
        const _id = e.target.id;
        const {update,progress} = upTask;
        const updateBy = value;
        const res = await fetch("/updatetask",{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
             _id,updateBy,update,progress
          })
      
        });
      if(res.status === 200){
        window.alert("task updated");
      
      }
      else if(res.status === 404){
        window.alert("task not updated");
      
      }else{
        window.alert("unknown error");
      }
      
      }

    const mapTasks = please.map((Task)=>{
        return(<div className="task" key = {Task._id}>
        <div className="heading">
            <h2>{Task.title}</h2>
            <p>{Task.createdAt.substring(0,10)}</p>
        </div>
        <div className="progress-bar">
            <progress value={Task.progress ? Task.progress : "10"} max="100"></progress>
        </div>
        <div className="description">
            <p>{Task.description} <Link to ={{pathname:'/details',state:{_id:Task._id}}}>more details</Link> </p> 
             <p>  Deadline : {Task.deadline.substring(0,10)}</p>                         
        </div>
        <form  method="PATCH" >
            <p>   Status : </p>
            <input type="number" name="progress" id="progress" placeholder="enter the progress in percentage..." onChange={handelInput}/>
            <input type="text" placeholder="Updates.."name="update" id="updates" onChange={handelInput}/>
            <input type="submit" value="Submit" id = {Task._id} onClick={updateTask}/>
        </form>
    </div>)
    
    });
    const history = useHistory();
    return props.isLoggedIn ? (
       <motion.div className="home-container" variants={containerVariant} initial="hidden" animate="visible" exit="exit" >
           <h1 className="welcome">Welcome {value}</h1>
           <div className="tasks">

                  {mapTasks}              
                
           </div>
       </motion.div>
    ):( 

        <Login setIsAdmin={()=>props.setIsAdmin()} setIsLoggedIn={()=>props.setIsLoggedIn()}/>
    )
}
export default Home;