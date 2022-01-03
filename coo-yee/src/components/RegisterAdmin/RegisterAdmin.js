import React,{useState} from 'react';
import {motion } from 'framer-motion';
import {Link,useHistory} from 'react-router-dom';
import "../Register/Register.css";
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
const RegisterAdmin = ()=>{
  
const history = useHistory();
    const [user,setUser]=useState({firstname:"",lastname:"",email:"",mobileNumber:"",employee_id:"",role:"",password:"",cpassword:""});
    const handelInput=(e)=>{
     let name = e.target.name;
     let value =e.target.value;
     setUser({...user,[name]:value});
     
    }
    const PostData = async(e)=>{
      e.preventDefault();
      const {firstname,lastname,email,mobileNumber,employee_id,role,password,cpassword} = user;
      console.log(email+password);
      const res = await fetch("/adminsignup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          firstname,lastname,email,mobileNumber,employee_id,role,password,cpassword
        })
    
      });
      if(res.status === 200){
       window.alert("registered successfully");
       history.push("/adminlogin");
      }
      else if(res.status===403){
        window.alert("copy cat huh");
      }
      else if(res.status===400){
        window.alert("all fiels are compulsory");
      }
      else if(res.status===401){
        window.alert("confirm password and password doesnot match");
      }
    }
return(
    <motion.div className="register-container"
    variants = {containerVariant}
    initial="hidden"
    animate="visible"
    exit="exit"
    >
        <div className="login-box">
  <h2>Add Amin</h2>
  <form method="POST" id="form-id">
    <div className="user-box">
      <input type="text" name="firstname" onChange={handelInput}/>
      <label>first name</label>
    </div>
    <div className="user-box">
      <input type="text" name="lastname" onChange={handelInput}/>
      <label>last name</label>

    </div>
    <div className="user-box">
      
      <input type="Email" name="email" onChange={handelInput}  />
      <label>Email</label>
    </div>
    <div className="user-box">
        <input type="number" name="mobileNumber" onChange={handelInput}/>
        <label>Phone Number</label>
    </div>
    <div className="user-box">
      <input type="number" name="employee_id" onChange={handelInput}/>
      <label>employee_id</label>
    </div>
    <div className="user-box">
        <input type="text" name="role" onChange={handelInput}/>
        <label >Role  </label>
    </div>
    <div className="user-box">
      <input type="password" name="password" onChange={handelInput}  />
      <label>Password</label>
    </div>
    <div className="user-box">
        <input type="password" name="cpassword" onChange={handelInput} />
        <label>Confirm Password</label>
    </div>
    
    <Link  onClick={PostData}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Add Admin
    </Link>
    
  </form>
</div>

    </motion.div>
);


}
export default RegisterAdmin;