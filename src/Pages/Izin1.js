import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBus } from "react-icons/fa";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import pictureMaintenance from './background-maint.png';

const Maintenance = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [izin, setIzin] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const fetchData = async () => {

        //fetch user from Rest API
       await axios.get('http://localhost:8000/api/izin')
            .then((response) => {

                //set response user to state
                setIzin(response.data);
                setIsLoading(false);
            })
    }

    //memanggil data user dan mengirim ke local storage
    useEffect(() => {

        fetchData()
    }
    )

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    })

    return (
                 
        <div style={{ backgroundImage: `url(${pictureMaintenance})` }} className='bg-cover'>
            <div className="flex justify-center text-center pt-[15%] pb-[10%]" >
                <div className="bg-slate-200 shadow-2xl rounded px-14 pb-7 pt-6">
                    <h1 className="font-logo">
                        <FaBus className="inline-block" /> SisipBis Pantau</h1>
                    <h1 className="mb-2">Tabel Pemantauan Armada</h1>                   

                    <thead className="border-separate border-spacing-2 border border-slate-500">
                        <tr className="table-fixed">
                            <th className="px-5">Nomer</th>
                            <th className="px-5">Nama</th>
                            <th className="px-5">Divisi</th>
                            <th className="px-5">Mulai Izin</th>
                            <th className="px-5">Akhir Izin</th>
                            <th className="px-5">Alasan</th>
                            <th className="px-5">Aksi</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <div className="flex justify-center">
                            <h1><ProgressBar borderColor="#005dff" barColor="#52b2fb" /></h1>
                        </div>
                    ) : <>
                            <tbody>
                        {izin.map((izin, key) => (
                                <tr user={izin} key={key}>
                                    <td></td>
                                    <td>{izin.nama}</td>
                                    <td>{izin.divisi}</td>
                                    <td>{izin.mulai_izin}</td>
                                    <td>{izin.akhir_izin}</td>
                                    <td>{izin.alasan}</td>
                                
                                </tr>
                        ))}
                        </tbody>
                    </>}



                </div>
            </div>
        </div>
        
    )
}

export default Maintenance