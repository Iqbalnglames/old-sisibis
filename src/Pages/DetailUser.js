import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
import UpdateUser from "./UpdateUser";

const DetailUser = () => {
    const [id, setId] = useState(useParams().id)
    const [data, setData] = useState({});
    const [imageUrl, setImageUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const [showUpdateUserPage, setShowUpdateUserPage] = useState('')

    const showUpdateUser = () => {
      setShowUpdateUserPage(!showUpdateUserPage);
    };

    
    const detailData = async() => {
        await axios.get(`http://localhost:8000/api/user-list/${id}`)
        .then((response)=>{
            setData(response.data)
        }
        )
    }
    
    const showImage = async() => {
      
      await axios.get(`http://localhost:8000/api/user-image/${data.user_photo}`, {responseType : 'blob'})
     
      .then(response => URL.createObjectURL(response.data))
      .then(url => setImageUrl(url))
            
  }

  const deleteData = async() => {

    Swal.fire({
        title: 'Yakin Hapus User?',

        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yakin'
      }).then((result) => {
        if (result.isConfirmed) {
            //fetch rest APi
            axios.delete(`http://localhost:8000/api/user-list/${id}`)
            
            .then(function (response) {
              Swal.fire({
                  icon: 'success',
                  title: 'User Deleted',
                  showConfirmButton: false,
                  timer: 1500
              })
            })
            //memunculkan alert ketika berhasil logout dengan sweetalert2
            navigate('/list-user')
              
        }
      })

}
    useEffect(()=>{
  
        showImage()
        detailData()
  
      } 
      )
      
    return (     
      <>
      {showUpdateUserPage ? <UpdateUser data={data} showUpdateUser={showUpdateUser}/> : null}
      <div className="flex justify-center">
            <div className="border rounded-md w-[1225px] pb-8 mt-[24px] bg-slate-200 mx-[27px]">
              <h1 className="mt-5 ml-5 text-2xl font-logo">
              <FaUserAlt className="inline-block"/> Account Detail
              </h1>
              <p className="mt-2 ml-5 mb-5">
                Detail Akun
              </p>        
              <div className="flex justify-center text-xl">            
                {isLoading ? <div>Loading....</div> :   <img src={imageUrl} width='200px' alt='gambar foto armada'/> }
              <div className="px-10">            
                <tr  className="flex">
                      <th className="px-4 py-2">Nama :</th>
                      <td className="px-4 py-2"> {data.nama}</td>                  
                    </tr>
                <tr  className="flex">
                      <th className="px-4 py-2">Divisi : </th>                  
                      <td className="px-4 py-2">{data.divisi}</td>                  
                    </tr>
                <tr  className="flex">
                      <th className="px-4 py-2">Email :</th>                  
                      <td className="px-4 py-2">{data.email}</td>                  
                    </tr>            
                <tr  className="flex">
                  <th className="px-2 py-4"><button onClick={showUpdateUser} className="p-2 bg-gray-800 hover:bg-gray-600 text-white rounded-md">Update Profile</button>                  
                  </th>              
                  <th className="px-2 py-4"><button onClick={deleteData} className="p-2 bg-red-800 hover:bg-gray-600 text-white rounded-md">Delete User</button>                  
                  </th>              
                    </tr>
              </div>
              </div>
              <Link to={'/list-user'}><button className="ml-10 mt-4 mb-4 p-2 rounded bg-[#D9D9D9] hover:bg-[#bfbfbf]">Kembali</button></Link> 
            </div>
          </div>
      </>   
    )
}

export default DetailUser;