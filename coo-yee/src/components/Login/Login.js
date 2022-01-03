import React, { useState,useEffect,useContext } from 'react';
import UserContext from '../../UserContext';
import {motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import {Link,useHistory} from 'react-router-dom';
import "./Login.css";
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

const Login = (props)=>{
  const [cookies, setCookie] = useCookies(['name']);

  const {value,setValue} = useContext(UserContext);
useEffect(function(){
  props.setIsAdmin();
});
const history = useHistory();
const [user,setUser]=useState({email:"",password:""});
const handelInput=(e)=>{
 let name = e.target.name;
 let dalue =e.target.value;
 setUser({...user,[name]:dalue});
 
}
const PostData = async(e)=>{
  e.preventDefault();
  const {email,password} = user;
  
  const res = await fetch("/signin",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      email,password
    })

  });
if(res.status === 200){
 const loggedUser = await res.json();
 setValue(loggedUser.firstname);
 setCookie('user_id',loggedUser._id);
 setCookie("username",loggedUser.firstname);
  history.push("/");
  props.setIsLoggedIn();

}
else if(res.status === 401|| res.status === 420){
  window.alert("invalid credentials");

}
else if(res.status===410){
  window.alert("tuu jaa re");
}else{
  window.alert("unknown error");
}

}
return(
    <motion.div className="login-container"
    variants = {containerVariant}
    initial="hidden"
    animate="visible"
    exit="exit"
    >
        <div className="login-box">
  <h2>Login</h2>
  <form method="POST" onSubmit={PostData} id="form">
    <div className="user-box">
      <input type="text" name="email" onChange={handelInput}  />
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password" name="password" onChange={handelInput} />
      <label>Password</label>
    </div>
    <Link  onClick={PostData}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
      
    </Link>
    <Link to="/register">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Register
    </Link>
    <Link to="/adminlogin">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Admin
    </Link>
  </form>
</div>

    </motion.div>
);


}
export default Login;