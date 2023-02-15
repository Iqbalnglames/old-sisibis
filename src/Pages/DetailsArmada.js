import React, { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosBuild } from "react-icons/io";

const DetailArmada = () => {
  
    const [isLoading, setIsLoading] = useState(true)
    const [imageUrl, setImageUrl] = useState(true)
    const [data, setData] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const controller = new AbortController()
    const [id, setId] = useState(useParams().id)

    const detailDataArmada = async() => {      
        await axios.get(`http://localhost:8000/api/maintenance/${id}`)
        .then((response)=>{
            setData(response.data)
        }
        )
        .controller.abort()
    }
   
    const showArmadaImage = async() => {
      
      await axios.get(`http://localhost:8000/api/detail-maintenances/${data.armada_picture_name}`, {responseType : 'blob'})
     
      .then(response => URL.createObjectURL(response.data))
      .then(url => setImageUrl(url))
      setIsLoading(false)
      controller.abort()
      
  }

  useEffect(()=>{
    
      showArmadaImage()
      detailDataArmada()
      if (!token) {
          navigate('/login')
      }
  })

  

  return (
    <>
     
      <div className="flex justify-center">
        <div className="border rounded-md w-[1225px] pb-8 mt-[24px] bg-slate-200 mx-[27px]">
          <h1 className="mt-5 ml-5 text-2xl font-logo">
          <IoIosBuild className="inline-block"/> SisipBis Maintenances
          </h1>
          <p className="mt-2 ml-5 mb-5">
            Detail Armada
          </p>        
          <div className="flex justify-center text-xl">            
              <img src={imageUrl} width='400px' alt='gambar foto armada'/>         
          <div className="px-10">            
            <tr  className="flex">
                  <th className="px-4 py-2">Nomer Lambung :</th>
                  <td className="px-4 py-2">{data.nomer_armada}</td>                  
                </tr>
            <tr  className="flex">
                  <th className="px-4 py-2">Nama Chasis :</th>                  
                  <td className="px-4 py-2">{data.nama_chasis}</td>                  
                </tr>
            <tr  className="flex">
                  <th className="px-4 py-2">Status :</th>                  
                  <td className={data.status === 'NEED MAINTENANCE'? 'px-4 py-2 text-red-600' : 'px-4 py-2 text-blue-700'}>{data.status}</td>                  
                </tr>
            <tr  className="flex">
                  <th className="px-4 py-2">Catatan :</th>                  
                  <td className="px-4 py-2">{data.catatan}</td>                  
                </tr>
            <tr  className="flex">
              <th className="px-2 py-4"><button className="p-2 bg-gray-800 hover:bg-gray-600 text-white rounded-md">Update Data Armada</button>                  
              </th>              
                </tr>
          </div>
          </div>
          <Link to={'/maintenances'}><button className="ml-10 mt-4 mb-4 p-2 rounded bg-[#D9D9D9] hover:bg-[#bfbfbf]">Kembali</button></Link> 
        </div>
      </div>
    </>
  );
};

export default DetailArmada;
