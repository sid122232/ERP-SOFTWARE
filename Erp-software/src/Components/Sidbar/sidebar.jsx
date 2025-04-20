import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
function Sidebar() {
    const [changeTheme, setChangeTheme] = useState(true)
    const [light, setLight] = useState()
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;


    useEffect(()=>{
        if(changeTheme){
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');

        }
else{
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
}

    },[changeTheme])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className='sidebar'>
            <div className='logo'>Adept Automation</div>
            <ul className='nav'>
                {isAuthenticated ? (
                    <>

                        <li className='navs' onClick={()=>setChangeTheme(!changeTheme)} > {changeTheme? <IoSunnyOutline/>: <FaMoon/>}</li>
                          

                        <li className='navs'><Link to="/dashboard">Dashboard</Link></li>
                        <li className='navs'><Link to="/Customers">Customers</Link></li>
                        <li className='navs'><Link to="/customerData">Set Customers</Link></li>
                        <li className='navs'><Link to="/employee">Employee</Link></li>
                        <li className='navs'><Link to="/employee/fillDetails">Set Employee</Link></li>
                        <li className='navs'><Link to="/invoice-creation">Create Invoice</Link></li>
                        <li className='navs'>
                            <button 
                                onClick={handleLogout} 
                          
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li className='navs'><Link to="/">Login</Link></li>
                )}
            </ul>
        </div>
    );
}

export default Sidebar;
