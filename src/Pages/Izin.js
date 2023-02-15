import React, { useState, useEffect } from "react";
import { FaBus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import picture from './background-absen.png';
import axios from "axios";
import Swal from "sweetalert2";

const Izin = () => {

    const navigate = useNavigate();
    const [nama, setNama] = useState('');
    const [alasan, setAlasan] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [mulai_izin, setMulaiIzin] = useState('');
    const [akhir_izin, setAkhirIzin] = useState('');
    const [validation , setValidation] = useState([])
    const Absen = () =>{
        navigate('/absensi')
    }

    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    }
    )

    const izin = async(e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nama', nama);
        formData.append('jabatan', jabatan);
        formData.append('alasan', alasan);
        formData.append('mulai_izin', mulai_izin);
        formData.append('akhir_izin', akhir_izin);
        
        await axios.post('http://127.0.0.1:8000/api/izin', formData)
        .then((response) => {
            if(response.data.success){
                Swal.fire({
                    icon: 'success',
                    title: 'Absen Berhasil dikirim',
                })
                navigate('/izin')
            }
        }
        ).catch((error)=>{

            setValidation(error.response.data)
        }
        )
    }

    const alertStyle = "bg-red-300 text-red-600 p-2 rounded-sm";
    const inputStyle = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const labelStyle = 'block text-left text-gray-700 text-sm font-bold mb-2'
    const buttonStyle = "flex rounded hover:bg-gray-400 mt-5 mb-10 bg-gray-300 p-2"

    return (
        <>
        

            <main style={{ backgroundImage: `url(${picture})` }} className="bg-cover">
                <div className="text-center p-[18%]">

                    <form onSubmit={izin} className=" bg-slate-100 shadow-2xl rounded px-14 pb-7 pt-10">

                        <div className="mb-4">
                            <h1 className="font-logo">
                                <FaBus className="inline-block" /> SisipBis Absensi</h1>
                            <h1>Silahkan isi form untuk Izin Tidak Masuk</h1>
                        </div>

                        <label className={labelStyle} htmlFor="Nama Pegawai">Nama Pegawai</label>
                        <input className={inputStyle} id="Nama Pegawai" type="text" placeholder="Masukkan Nama Anda disini" onChange={(e)=>setNama(e.target.value)} />
                        {
                            validation.nama && (
                                <div className={alertStyle}>
                                    {validation.nama}
                                </div>
                            )
                        }
                        <label className={labelStyle} htmlFor="Jabatan">Jabatan</label>
                        <input className={inputStyle} id="Nama Pegawai" type="text" placeholder="Masukkan Nama Jabatan Anda disini" onChange={(e)=>setJabatan(e.target.value)} />
                        {
                            validation.jabatan && (
                                <div className={alertStyle}>
                                    {validation.jabatan}
                                </div>
                            )
                        }
                        <label className={labelStyle} htmlFor="Jabatan">Alasan Perizinan</label>
                        <input className={inputStyle} id="Nama Pegawai" type="text" placeholder="Masukkan Alasan Anda" onChange={(e)=>setAlasan(e.target.value)}/>
                        {
                            validation.alasan && (
                                <div className={alertStyle}>
                                    {validation.alasan}
                                </div>
                            )
                        }
                        <label className={labelStyle} htmlFor="Mulai Izin">Mulai Izin (Bulan/Tanggal/Tahun)</label>
                        <input className={inputStyle}  type="date" onChange={(e)=>setMulaiIzin(e.target.value)}/>
                        {
                            validation.mulai_izin && (
                                <div className={alertStyle}>
                                    {validation.mulai_izin}
                                </div>
                            )
                        }
                        <label className={labelStyle} htmlFor="Nama Pegawai">Akhir Izin (Bulan/Tanggal/Tahun)</label>
                        <input className={inputStyle} type="date" onChange={(e)=>setAkhirIzin(e.target.value)}/>
                        {
                            validation.akhir_izin && (
                                <div className={alertStyle}>
                                    {validation.akhir_izin}
                                </div>
                            )
                        }
                        <button type="submit" className={buttonStyle} >Kirim</button>

                        <h1 className="flex"> Kembali ke Absensi kehadiran</h1>
                        <button type="button" onClick={Absen} className={buttonStyle}>Kembali</button>
                    </form>
                </div>
            </main>

        
        </>
    )
}

export default Izin