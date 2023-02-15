import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAltSlash } from "react-icons/fa"

export const Logout = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const logoutHandler = async() => {
        
        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`


        Swal.fire({
            title: 'Yakin Logout?',

            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yakin'
          }).then((result) => {
            if (result.isConfirmed) {
                //fetch rest APi
                axios.post('http://localhost:8000/api/logout')
        
                //remove token yang ada di local storage
                localStorage.removeItem('token')
                
                //memunculkan alert ketika berhasil logout dengan sweetalert2
                navigate('/login')
                  
                  //redirect ke login page
                  window.location.reload(result.isConfirmed);
            }
          })

    }

    return(
      <Link onClick={logoutHandler}>
        <div className="hover:bg-[#e0dede] border border-white p-2 pb-1.5 rounded">
          <h1>
           <FaUserAltSlash className="inline-block" /> Logout 
          </h1>
        </div>
      </Link>

    )
}