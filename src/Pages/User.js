import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import picture from './background-bus.png';
import { GiAutoRepair } from 'react-icons/gi';
import { FcTodoList } from 'react-icons/fc';
import { BsClipboardCheck } from 'react-icons/bs';
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

const User = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const cardStyle = 'border border-white rounded-lg p-8 hover:opacity-[0.85] bg-black opacity-75';
    const pStyle = 'flex justify-center text-4xl mb-3'
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token')
    useEffect(()=>{
        
        if(!token){
            navigate('/login')
        }
    }
    )
    useEffect(()=>{
        if(user.role === 'admin'){
            navigate('/admin')
        }
    }
    )

    
    const absensi = () => {
        navigate("/absensi")
    }
    const maintenance = () => {
        navigate("/maintenance")
    }
    const laporan = () => {
        navigate("/laporan")
    }

    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        //fetch user from Rest API
        axios.get('http://localhost:8000/api/user')
            .then((response) => {

                //set response user to state
                setUser(response.data);
                setIsLoading(false);

            },[])
    }

    //memanggil data user dan mengirim ke local storage
    useState(() => {

        fetchData()
    }
    )
  
    return (
        <>
                
        {isLoading? <div className="mt-[20%] ml-[45%]"><div><ColorRing/><br />Loading...</div></div> : 
            <div style={{ backgroundImage: `url(${picture})` }} className="p-[400px] bg-cover font-component">
        <div className="text-center mt-[-200px] text-white">
            <h1 className="text-5xl font-component2">Selamat datang di SisipBis, {user.nama}</h1>
            <p className="mt-2 ">Sistem Informasi Perawatan Bis</p>
        </div>
        <h1 className="text-center text-2xl text-white font-component2 mt-14">Silahkan pilih fitur Di bawah ini</h1>
        <div className="flex justify-around text-white mt-10" >
            <div className={cardStyle} onClick={absensi}>
                <p className={pStyle}> <FcTodoList /> </p>
                <h1>Absensi Harian Kehadiran Pegawai</h1>
            </div>
            <div className={cardStyle} onClick={maintenance}>
                <p className={pStyle}> <GiAutoRepair /> </p>
                <h1>Periksa dan Maintenance Armada</h1>
            </div>
        </div>
        <div className="flex justify-center text-white mt-10" onClick={laporan}>
            <div className={cardStyle}>
                <p className={pStyle}> <BsClipboardCheck /> </p>
                <h1>Laporkan kendala pekerjaan ke Atasan</h1>
            </div>           
        </div>
    </div>            
}
            </>
        
    )
}

export default User