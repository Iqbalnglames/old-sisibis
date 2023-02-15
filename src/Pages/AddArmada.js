import React, { useState, useEffect } from "react";
import pictureMaintenance from './background-maint.png';
import { FaBus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";



const Absensi = () => {


    const inputStyle = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const labelStyle = 'block text-left text-gray-700 text-sm font-bold mb-2'
    const buttonStyle = "flex rounded hover:bg-gray-400 mt-5 mb-10 bg-gray-300 p-2"
    const alertStyle = "bg-red-300 text-red-600 p-2 rounded-sm";
    
    const token = localStorage.getItem('token')
    
    const [nomer_armada, setNomerArmada] = useState('');
    const [armada_picture_name, setArmadaPictureName] = useState(null);
    const [nama_chasis, setNamaChasis] = useState('');
    const [status, setStatus] = useState('');
    const [catatan, setCatatan] = useState('');
    const [validation, setValidation] = useState([])


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    })

    const navigate = useNavigate()
    const Maintenance = () => {
        navigate('/maintenance')
    }

    const addArmada = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nomer_armada', nomer_armada);
        formData.append('armada_picture_name', armada_picture_name);
        formData.append('nama_chasis', nama_chasis);
        formData.append('status', status);
        formData.append('catatan', catatan);

       
        await axios.post('http://127.0.0.1:8000/api/maintenance/', formData)
            .then((response) => {
                if (response.data.success) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Armada Berhasil ditambahkan',
                    })
                    navigate('/maintenance')
                }
            }

            )
            .catch((error) => {

                //assign error to state "validation"
                setValidation(error.response.data);
            })
    }


    return (
       
            
            <div style={{ backgroundImage: `url(${pictureMaintenance})` }} className="bg-cover">
                <div className="text-center p-[18%]">

                    <form onSubmit={addArmada} encType="multipart/form-data" className=" bg-slate-100 shadow-2xl rounded px-14 pb-7 pt-10">

                        <div className="mb-4">
                            <h1 className="font-logo">
                                <FaBus className="inline-block" /> SisipBis Pantau</h1>
                            <h1>Silahkan isi form untuk penambahan</h1>
                        </div>

                        <label className={labelStyle} >Foto Armada</label>
                        <input className={inputStyle} type="file" placeholder="Masukkan Nomer Armada yang baru" onChange={(e) => setArmadaPictureName(e.target.files[0])} />
                        {
                            validation.armada_picture_name && (
                                <div className={alertStyle}>
                                    {validation.armada_picture_name}
                                </div>
                            )
                        }
                        <label className={labelStyle} >Nomer Armada Baru</label>
                        <input className={inputStyle} type="text" placeholder="Masukkan Nomer Armada yang baru" onChange={(e) => setNomerArmada(e.target.value)} />
                        {
                            validation.nomer_armada && (
                                <div className={alertStyle}>
                                    {validation.nomer_armada}
                                </div>
                            )
                        }

                        <label className={labelStyle} >Nama Chasis Armada</label>
                        <input className={inputStyle} type="text" placeholder="Masukkan Nama Chasis Armada disini" onChange={(e) => setNamaChasis(e.target.value)} />
                        {
                            validation.nama_chasis && (
                                <div className={alertStyle}>
                                    {validation.nama_chasis}
                                </div>
                            )
                        }

                        <label className={labelStyle} >Status</label>
                        <input className={inputStyle} placeholder='Masukkan Status Armada' type="text" onChange={(e) => setStatus(e.target.value)} />
                        {
                            validation.status && (
                                <div className={alertStyle}>
                                    {validation.status}
                                </div>
                            )
                        }

                        <label className={labelStyle}>Catatan</label>
                        <input className={inputStyle} id="currentTime" type="text" onChange={(e) => setCatatan(e.target.value)} placeholder='Tulis Catatan Anda Untuk Armada' />
                        {
                            validation.catatan && (
                                <div className={alertStyle}>
                                    {validation.catatan}
                                </div>
                            )
                        }

                        <button type="submit" className={buttonStyle}>Kirim</button>            

                        <button type="button" onClick={Maintenance} className={buttonStyle}>Kembali ke Tabel Maintenance</button>

                    </form>
                </div>
            </div>
            
        
    )
}

export default Absensi