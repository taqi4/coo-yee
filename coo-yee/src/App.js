import React,{useState,useMemo,useContext} from 'react';
import {Switch,Route,useLocation} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import "./App.css";

import Home from './components/Home/Home';
import {AnimatePresence} from 'framer-motion';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AdminLogin from './components/AdminLogin/AdminLogin';
import Logout from './components/Login/Logout';
import  UserContext from './UserContext';
import AddTask from './components/AddTask/AddTask';
import AdminPanel from './components/AdminPanel/AdminPanel';
import RegisterAdmin from './components/RegisterAdmin/RegisterAdmin';
import TaskDetails from './components/TaskDetails/TaskDetails';
import RequestLeave from './components/leaveRequest/requestLeave';
import LeaveStatus from './components/LeaveStatus/LeaveStatus';
import Requests from './components/Requests/Requests';
import LeaveCounter from './components/LeaveCounter/LeaveCounter';

const App = () => {
   const [isAdmin,setIsAdmin] = useState(true);
   const [isLoggedIn,setIsLoggedIn]= useState(false);     
  const location = useLocation();
  const [value,setValue] = useState() ;
  //const providerValue = useMemo(()=>({value,setValue}),[value,setValue]);

    return (
    <div className="container">
    
        <NavBar
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}/>
          <UserContext.Provider value ={{value,setValue}}>

        <AnimatePresence exitBeforeEnter>
        <Switch location= {location} key={location.key}>
          <Route path='/' exact component={()=><Home isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsAdmin={()=>setIsAdmin(false)} setIsLoggedIn={()=>setIsLoggedIn(true)}/>} />
          <Route path='/login' component={()=><Login setIsAdmin={()=>setIsAdmin(false)} setIsLoggedIn={()=>setIsLoggedIn(true)}/>}  />
          <Route path='/adminlogin' component={()=><AdminLogin setIsAdmin={()=>setIsAdmin(true)} setIsLoggedIn={()=>setIsLoggedIn(true)}/>}/>
          <Route path='/logout' component={()=> <Logout setIsLoggedIn={()=>setIsLoggedIn(false)}/>} />
          <Route path='/register' component={Register}/>
          <Route path='/registeradmin' component={()=>{return isLoggedIn?<RegisterAdmin/>:<Logout setIsLoggedIn={()=>setIsLoggedIn(false)}/>}}/>
          <Route path='/details' component={TaskDetails}/>
          <Route path="/leaveStatus" component={()=><LeaveStatus isLoggedIn={isLoggedIn}/>}/>
          <Route path="/RequestLeave" component={()=><RequestLeave isLoggedIn={isLoggedIn}/>} />
          <Route path="/leaveCounter" component={()=>{return isLoggedIn ? <LeaveCounter/>:<Logout setIsLoggedIn={()=>setIsLoggedIn(false)}/>}}/>
          <Route path="/adminpanel" component={()=><AdminPanel isLoggedIn={isLoggedIn} isAdmin={isAdmin} setIsAdmin={()=>setIsAdmin(false)} setIsLoggedIn={()=>setIsLoggedIn(true)}/>}/>
          <Route path='/addtask' component={()=>{return isLoggedIn?<AddTask/>:<Logout setIsLoggedIn={()=>setIsLoggedIn(false)}/>}}/>
          <Route path="/requests" component={()=>{return isLoggedIn ? <Requests/>:<Logout setIsLoggedIn={()=>setIsLoggedIn(false)}/>}}/>
        </Switch>

        </AnimatePresence>
        </UserContext.Provider>
  
    
    </div>
  );
    }


export default App;
