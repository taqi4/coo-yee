import React,{useState,useEffect,useContext} from 'react';
import {motion} from 'framer-motion';
import {Link,useHistory} from 'react-router-dom';
import "./AddTask.css";
import UserContext from '../../UserContext';

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
const AddTask= () =>{
    const assignedTo = [];
    const [employees,setEmployees] = useState([]);
    const {value,setValue} =useContext(UserContext);
    const [crTask,setCrTask] = useState({title:"",description:"",deadline:""});
    useEffect(async ()=>{
        const res = await fetch("/getallemployees");
        const allEmployees = await res.json();
         setEmployees(allEmployees);

    },[]);
    const handelInput=(e)=>{
        let name = e.target.name;
        let dalue =e.target.value;
        setCrTask({...crTask,[name]:dalue});
        
       }
     const handelChange = (e)=>{
         let options = e.target.options;
         for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              assignedTo.push(options[i].value);
            }
          }         
     }
    
  const CreateTask = async(e) =>{
      const createdBy = "taqi";
      const {title,description,deadline} = crTask;
    const res = await fetch("/createtask",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title,description,deadline,assignedTo,createdBy
        })
    
      });
      if(res.status === 200){
          window.alert("task created");
      }
      else if(res.status === 401){
          window.alert("task not created");
      }
      else{
          window.alert("unknown error");
      }

  }
    return(
 <motion.div className = "add-task"
 variants = {containerVariant}
 initial = "hidden"
 animate="visible"
 exit="exit"
 >
  <div className="login-box">
  <h2>New Task</h2>
  <form method="POST" onSubmit={CreateTask} id="form">
    <div className="user-box">
      <input type="text" name="title" onChange={handelInput}  />
      <label>Title</label>
    </div>
    <div className="user-box">
      <input type="text" name="description" onChange={handelInput} />
      <label>Description</label>
    </div>
    <div className="user-box">
      <input type="date" name="deadline" onChange={handelInput} />
      <label>Deadline</label>
    </div>
     <p>Assigned To :</p>
    <div className="user-box">
         
          <select multiple={true} name = "assignedTo" onChange={handelChange}id="assignedTo">{employees.map((employee,index)=>{
              return(
                  <option value ={employee.firstname} key= {index}>{employee.firstname}</option>
              );
          })}
          </select>
    </div>
    
    <Link  onClick={CreateTask}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Add Task
      
    </Link>
   
  </form>
</div>   
 </motion.div>);
}

export default AddTask; 