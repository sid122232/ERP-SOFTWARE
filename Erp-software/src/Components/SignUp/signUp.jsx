import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = ()=>{

            const navigate = useNavigate();
    
    
    const [formData, setFormData] = useState({
        userName : "",
        password : ""
})


//Handle input change
const handleChangeRequired = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}

const handleFormSubmit = async (e)=>{
    e.preventDefault();
try {
    const response = await fetch('http://localhost:8080/public/signup', {
        method:"POST",
headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify(formData)
     })
     if(response.ok){
        setFormData({
            userName : "",
            password : ""
        })
        alert("Successfully Signed up!");
        navigate('/')
        
     }
} catch (error) {
    console.error("Error", error)
    
    
}

}


return (
    <div>
        <form onSubmit={handleFormSubmit}>
        <h1>SignUp Form</h1>
                   <input type="text" name="userName" placeholder="Enter the username" value={formData.userName} onChange={handleChangeRequired} required />
                   <input type="text" name="password" placeholder="password" value={formData.password} onChange={handleChangeRequired} required />
                 
                   <button type="submit" className='btn'>Submit</button>
               </form>
               </div>
    )
}


export default SignUp
