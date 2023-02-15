import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBus } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    
    const [user, setUser] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validation , setValidation] = useState([])
    const navigate = useNavigate();
    const alertStyle = "bg-red-300 text-red-600 p-2 rounded-sm";
    const token = localStorage.getItem('token')
    
    useEffect(()=>{
        if(token){
            navigate('/admin')
        }
        })
        
        //memanggil data user dan mengirim ke local storage
        const loginHandler = async (e) => {
            e.preventDefault();
        
            //initialize formData
            const formData = new FormData();
            
            //append data to formData
            formData.append('username', username);
            formData.append('password', password);
            
            //send data to server
            await axios.post('http://127.0.0.1:8000/api/login', formData)
            .then((response) => {
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            axios.get('http://localhost:8000/api/user')

            if(response.data.success){
                //set token on localStorage
                localStorage.setItem('token', response.data.token);           
                setUser(response.data) 
                window.location.reload()                    
                //redirect to dashboard
                navigate('/admin') 
            }
        })
        .catch((error) => {
            
            //assign error to state "validation"
            setValidation(error.response.data);
        })
    };
    
    useEffect(()=> {

        loginHandler()
    }
    )

    return (      
        <div className="flex mt-[30%]">
        <div className="bg-slate-100 shadow-2xl rounded px-8 pt-5 mb-4 ">
            <h1 className="text-center font-logo"><FaBus className="inline-block" /> SisipBis</h1>
        <h1 className="text-black text-center mb-4">Login untuk mengakses SisipBis</h1>
        {
         validation.message && (
            <div className={alertStyle}>
        {validation.message}
            </div>
         )
        }

        <form onSubmit={loginHandler} className=''>
            <div className="mb-4" >
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" onChange={(e) => setUsername(e.target.value)} type="text"  placeholder="Username" />
            </div>
            {validation.username && (
                <div className={alertStyle}>
                    {validation.username[0]}
                </div>
            )}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-[-10px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Password" />
            </div>
            {validation.password && (
                <div className={alertStyle}>
                    {validation.password[0]}
                </div>
            )}
            <button type="submit" className="bg-[#81c8f4] p-2 mb-4 mt-4 rounded hover:bg-[#5c96ba] hover:text-white">Login</button>
        </form>
    </div>
        </div>  
    )
}

export default Login