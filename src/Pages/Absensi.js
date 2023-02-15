import React, { useState, useEffect } from "react";
import picture from './background-absen.png';
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
    
    const navigate = useNavigate()
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [validation, setValidation] = useState([])
    const [waktu_kehadiran, setWaktu_Kehadiran] = useState('');


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    })

    const Izin = () => {
        navigate('/izin')
    }

    const absen = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nama', nama);
        formData.append('jabatan', jabatan);
        formData.append('waktu_kehadiran', waktu_kehadiran);

        await axios.post('http://127.0.0.1:8000/api/absen', formData)
            .then((response) => {
                if (response.data.success) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Absen Berhasil dikirim',
                    })
                    navigate('/')
                }
            }

            )
            .catch((error) => {

                //assign error to state "validation"
                setValidation(error.response.data);
            })
    }

    return (
        <>
           
            <main style={{ backgroundImage: `url(${picture})` }} className="bg-cover">
                <div className="text-center p-[18%]">

                    <form onSubmit={absen} className=" bg-slate-100 shadow-2xl rounded px-14 pb-7 pt-10">

                        <div className="mb-4">
                            <h1 className="font-logo">
                                <FaBus className="inline-block" /> SisipBis Absensi</h1>
                            <h1>Silahkan isi form untuk absensi</h1>
                        </div>

                        <label className={labelStyle} htmlFor="Nama Pegawai">Nama Pegawai</label>
                        <input className={inputStyle} id="Nama Pegawai" type="text" placeholder="Masukkan Nama Anda disini" onChange={(e) => setNama(e.target.value)} />
                        {
                            validation.nama && (
                                <div className={alertStyle}>
                                    {validation.nama}
                                </div>
                            )
                        }

                        <label className={labelStyle} htmlFor="Jabatan">Jabatan</label>
                        <input className={inputStyle} id="Nama Pegawai" type="text" placeholder="Masukkan Nama Jabatan Anda disini" onChange={(e) => setJabatan(e.target.value)} />
                        {
                            validation.jabatan && (
                                <div className={alertStyle}>
                                    {validation.jabatan}
                                </div>
                            )
                        }
                        <label className={labelStyle} htmlFor="Nama Pegawai">Jam Kehadiran</label>
                        <input className={inputStyle} id="currentTime" type="time" onChange={(e) => setWaktu_Kehadiran(e.target.value)} />
                        {
                            validation.waktu_kehadiran && (
                                <div className={alertStyle}>
                                    {validation.waktu_kehadiran}
                                </div>
                            )
                        }
                        <button type="submit" className={buttonStyle} >Kirim</button>
                        <h1 className="flex"> anda sakit/ada halangan lain yang mendesak? bisa klik button di bawah ini</h1>

                        <button type="button" onClick={Izin} className={buttonStyle}>Form Perizinan</button>

                    </form>
                </div>
            </main>

           
        </>
    )
}

export default Absensi