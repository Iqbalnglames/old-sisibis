import React from "react";
import pictureMaintenance from './background-maint.png';
import { FaBus } from 'react-icons/fa'


const Laporan = () => {
    
    const inputStyle = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const labelStyle = 'block text-left text-gray-700 text-sm font-bold mb-2'
    const buttonStyle = "flex rounded hover:bg-gray-400 mt-5 mb-10 bg-gray-300 p-2"
    const alertStyle = "bg-red-300 text-red-600 p-2 rounded-sm";

    return (
        <>
        
        <main style={{ backgroundImage: `url(${pictureMaintenance})` }} className="bg-cover">
            <div className="text-center p-[18%]">

                <form onSubmit className=" bg-slate-100 shadow-2xl rounded px-14 pb-7 pt-10">

                    <div className="mb-4">
                        <h1 className="font-logo">
                            <FaBus className="inline-block" /> SisipBis Lapor</h1>
                        <h1>Laporkan kendala anda di sini</h1>
                    </div>

                    <label className={labelStyle} >Nama Pelapor</label>
                    <input className={inputStyle} type="text" placeholder="Masukkan Nomer Armada yang baru"  />
                    {/* {
                        validation.nama && (
                            <div className={alertStyle}>
                                {validation.nama}
                            </div>
                        )
                    } */}

                    <label className={labelStyle} >Divisi</label>
                    <input className={inputStyle} type="text" placeholder="Masukkan Nama Chasis Armada disini"  />
                    {/* {
                        validation.jabatan && (
                            <div className={alertStyle}>
                                {validation.jabatan}
                            </div>
                        )
                    } */}

                    <label className={labelStyle} >Laporkan Kendala Anda</label>
                    <input className={inputStyle} placeholder='Masukkan Status Armada' type="text"  />
                    {/* {
                        validation.waktu_kehadiran && (
                            <div className={alertStyle}>
                                {validation.waktu_kehadiran}
                            </div>
                        )
                    } */}
                    
                    <button type="submit" className={buttonStyle} >Kirim</button>            

                </form>
            </div>
        </main>
        
</>
    )
}

export default Laporan