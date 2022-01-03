import React, { useState } from 'react';
import {menuListEm} from './menuList';
import {menuListAdmin} from './menuListAdmin';
import  {NavLink} from 'react-router-dom';
import {motion} from 'framer-motion';
import "./NavBar.css";
const MenuListEmployee = menuListEm.map(({url,title})=>{
    return(
        <motion.li className="list-item" key = {title} 
        whileHover={{scale:1.1,transition:{type:'spring',stiffness:120,yoyo:Infinity,damping:8}}}><NavLink exact to ={url} activeClassName="active">{title}</NavLink></motion.li>
    );
});
const MenuListAdmin = menuListAdmin.map(({url,title})=>{
    return(
        <motion.li className="list-item" key = {title} 
        whileHover={{y:-3,originY:0,transition:{type:'spring',stiffness:120,yoyo:Infinity}}} ><NavLink exact to ={url} activeClassName="active">{title}</NavLink></motion.li>
    
    );
});
   
const NavBar =  (props) =>{
    const [clicked,setClicked] = useState(false);    
    return props.isLoggedIn ? (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition ={{type:'tween',duration:1.5}} className="navbar">
            <motion.div initial={{x:"100vw"}} animate={{x:0}} transition={{delay:1,type:'spring',stiffness:150}} className="logo">
                <motion.i 
                initial = {{rotate:-360,y:'-100vh'}} 
                animate={{rotate:0,y:0} }
                
                transition={{delay:2,duration:2,type:'spring',stiffness:150}}
                className="fa fa-link"></motion.i>
                Coo<font  className="sep">Yee</font>
            </motion.div>
            <div className="toggle-btn" onClick ={()=>setClicked(!clicked)}>
                <i className={clicked ? "fa fa-times":"fa fa-bars"}></i>
            </div>
            <div className="collapse">
                <ul className ={clicked ? "menu-list" : "menu-list closed"}>
                    {props.isAdmin ?MenuListAdmin: MenuListEmployee}
                </ul>
            </div>
            
            </motion.div>
          ) :(null) }
        
        
          
export default NavBar;