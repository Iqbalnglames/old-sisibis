import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layouts from '../Components/Layouts';
import User from '../Pages/User';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import Absensi from '../Pages/Absensi';
import Maintenance from '../Pages/Maintenances';
import Izin from '../Pages/Izin';
import AddArmada from '../Pages/AddArmada';
import Admin from '../Pages/Admin';
import ListUser from '../Pages/ListUsers';
import ListAbsen from '../Pages/ListAbsens';
import ListIzin from '../Pages/ListIzin';
import DetailUser from '../Pages/DetailUser';
import AccountDetail from '../Pages/AccountDetail';
import axios from 'axios';
import Pengaduan from '../Pages/DaftarPengaduan';
import DetailArmada from '../Pages/DetailsArmada';


const Ruter = () => {
    const token = localStorage.getItem('token')
    const [user, setUser] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [maintenances, setMaintenances] = useState('')

  
    const fetchData = async () => {
        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        //fetch user from Rest API
        let response =  await axios.get("http://localhost:8000/api/user")
          //set response user to state      
          setUser(response.data);
          setIsLoading(false)
          
        }
        const showImage = async () => {
        
          const response = await axios.get(`http://localhost:8000/api/user-image/${user.user_photo}`, 
          {
            responseType: 'blob'
          });
          const url = URL.createObjectURL(response.data);
          setImageUrl(url);
          setIsLoading(false);
        
      
      }
        
      //memanggil data user dan mengirim ke local storage
    
      useEffect(()=>{
        
          showImage()
          fetchData()
       
    
      },[isLoading])
    
    

//     const fetchDataMaintenance = async () => {

//         //fetch data from Rest API
//        const response = await axios.get('http://localhost:8000/api/maintenance')
//           setMaintenances(response.data)
//     }

    useEffect(()=>{
                
                // fetchData()
                showImage()
                // fetchDataMaintenance()       
      
    },[])
    
    
    return (
        <div>
            <Routes>
                <Route path='/*' element={<NotFound />} />

                <Route index path='/' element={<Layouts />}/>
                    <Route path='login' element={<Login />}/>
                    <Route path='admin' element={<Admin />}/>
                    <Route path='list-user' element={<ListUser />}/>
                    <Route path='profile' element={<AccountDetail user={user} imageUrl={imageUrl}/>}/>
                    <Route path='list-absen' element={<ListAbsen />}/>
                    {/* 
                    <Route path='list-izin' element={<ListIzin />}/>
                    <Route path='maintenances' element={<Maintenance maintenances={maintenances} isLoading={isLoading}/>}/>
                    <Route path='detail-maintenances/:id' element={<DetailArmada maintenances={maintenances} />}/>
                    <Route path='detail-user/:id' element={<DetailUser />}/>
                    <Route path='pengaduan' element={<Pengaduan />}/> */}
            </Routes>
        </div>
    )
}


export default Ruter