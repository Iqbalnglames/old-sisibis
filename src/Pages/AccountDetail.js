import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const AccountDetail = ({user, imageUrl}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    })

  return (
    <>
     
      <div className="flex justify-center">
        <div className="border rounded-md w-[1225px] pb-8 mt-[24px] bg-slate-200 mx-[27px]">
          <h1 className="mt-5 ml-5 text-2xl font-logo">
          <FaUserAlt className="inline-block"/> Account Detail
          </h1>
          <p className="mt-2 ml-5 mb-5">
            Detail Akun
          </p>        
          <div className="flex justify-center text-xl">            
              <img src={imageUrl} width='200px' alt='gambar foto armada'/>         
          <div className="px-10">            
            <tr  className="flex">
                  <th className="px-4 py-2">Nama :</th>
                  <td className="px-4 py-2"> {user.nama}</td>                  
                </tr>
            <tr  className="flex">
                  <th className="px-4 py-2">Divisi : </th>                  
                  <td className="px-4 py-2">{user.divisi}</td>                  
                </tr>
            <tr  className="flex">
                  <th className="px-4 py-2">Email :</th>                  
                  <td className="px-4 py-2">{user.email}</td>                  
                </tr>            
            <tr  className="flex">
              <th className="px-2 py-4"><button className="p-2 bg-gray-800 hover:bg-gray-600 text-white rounded-md">Update Profile</button>                  
              </th>              
                </tr>
          </div>
          </div>
          <Link to={user.role === 'admin'? '/admin' : '/user'}><button className="ml-10 mt-4 mb-4 p-2 rounded bg-[#D9D9D9] hover:bg-[#bfbfbf]">Kembali</button></Link> 
        </div>
      </div>
    </>
  );
};

export default AccountDetail;
