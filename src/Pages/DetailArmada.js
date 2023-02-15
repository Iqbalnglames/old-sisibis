import React from "react";
import pictureMaintenance from './background-maint.png';
import { FaBus } from "react-icons/fa";
import { Link } from "react-router-dom";

const DetailArmada = () => {
    return (
       
            <div style={{ backgroundImage: `url(${pictureMaintenance})` }} className='bg-cover'>
            <div className=" text-center pt-[10%] pb-[5%]" >
                <div className=" bg-slate-200 shadow-2xl rounded px-14 pb-7 pt-6 mx-[25%]">
                   <h1 className="text-2xl font-logo"><FaBus className="inline-block" /> SisipBis Armada</h1>
                   <h1 className="text-2xl mb-3 font-logo">Detail User</h1>
                   <div className="flex justify-center mb-4">
                    <img src={pictureMaintenance} width='150px' alt='gambar foto user'/>
                   </div>
                   <div className="text-left">
                   <h1>Nomer Lambung Armada : EP3</h1>
                   <h1>Nama Chasis : Scania k410</h1>
                   <h1>Status Armada : FRESH</h1>
                   <h1>Catatan Armada : -</h1>
                   </div>
                   <Link to='/list-user'><button>Kembali</button></Link>
                </div>
            </div>
            </div>
       

    )
}

export default DetailArmada;