import React, { useEffect } from 'react';
import Login from './Login';
import {useHistory} from 'react-router-dom'

const Logout= (props) =>{
    const history = useHistory();
useEffect(function(){
    props.setIsLoggedIn();
    history.push("/login");


});
return (<div> logging out ...</div>);
}

export default Logout;