import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import'../Login/login.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";







function Login() {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const navigate = useNavigate();

const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')
const [showPassowrd,setShowPassword] = useState(false)

//Handle input change
const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:8080/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.trim(),
        password: password.trim(),
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.jwtToken);
      alert("Login successful");
      setIsAuthenticated(true);
      navigate("/employee/fillDetails");
    } else {
      console.log("Login error: ", data);
      alert("Login failed: " + (data?.error || "Unknown error"));
    }
  };
const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };
const toggleVisibility= ()=>{
  setShowPassword(!showPassowrd)
}
return (
    
    <div className='main'>
    {isAuthenticated ?(
        <>
        <button onClick={handleLogout} >Logout</button>
        </>
    ):(
        <>

    <div className='heading'>

    {/* <h1 className='adept'>ADEPT AUTOMATION </h1> */}
    <h1 className='subtitle'>Personalised ERP software</h1>
    </div>
    <div className='wrapper '>

<form onSubmit={handleLogin}>
<h1 className='h1'>Login Form</h1>
<div className='input1'>

     <input type="text" name="userName" placeholder="Enter the userName" value={userName} onChange={(e)=>setUserName(e.target.value)} required 
   />
{<FaUser className='user-icon' />}


</div>
<div className='input1'>

        <input type={showPassowrd?"text":"password"} name="password" placeholder="Enter the password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <RiLockPasswordLine className='user-icon' onClick={toggleVisibility} style={{ cursor: 'pointer' }}/>
</div> 

      
        <button type="submit" className='btn'>Submit</button>
    </form>
    </div>
        </>
    )}
    </div>
)
}


export default Login
