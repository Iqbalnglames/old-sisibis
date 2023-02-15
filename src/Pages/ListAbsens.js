import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { HiOutlineClipboardCheck } from "react-icons/hi";

const ListAbsen = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [absen, setAbsen] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    let text = ''
    for (let i = 1; i < 2; i++) {
      text =  i;
    }  
    const fetchData = async () => {

        //fetch user from Rest API
    let response =  await axios.get('http://localhost:8000/api/absen')
  
                //set response user to state
                setAbsen(response.data);
                setIsLoading(false);
            
          
    }

    //memanggil data user dan mengirim ke local storage
    useEffect(() => {

        fetchData()
        
    },[]
    )

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    })

  return (
    <>
     
      <div className="flex justify-center">
        <div className="border rounded-md w-[1225px] pb-8 mt-[24px] bg-slate-200 mx-[27px]">
          <h1 className="mt-5 ml-5 text-2xl font-logo">
            <HiOutlineClipboardCheck className="inline-block" /> SisipBis Absensi
          </h1>
          <p className="mt-2 ml-5">
            List Absensi Pegawai
          </p> 
          <Link to={'/list-izin'}><button className="ml-10 mt-4 mb-4 p-2 rounded bg-[#D9D9D9] hover:bg-[#bfbfbf]">Izin Pegawai</button></Link>        
          
          <div className="flex justify-center text-xl">
            <table className="table-auto w-[95%]">
              <thead className="">
                <tr  className="bg-gray-300">
                  <th className="px-4 py-2">Nomer</th>
                  <th className="px-4 py-2">Waktu Kehadiran</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Divisi</th>
                  <th className="px-4 py-2">Laporan</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>

              {isLoading ? (
                <>
                <td></td>
                <td></td>                
                <td className="flex justify-center">
                  <h1>
                    <ProgressBar borderColor="#005dff" barColor="#52b2fb" />
                  </h1>
                </td>
                </>
              ) : (
                <>
                  <tbody>
                    {absen &&
                      absen.map((absen, key) => (
                        <tr className="bg-gray-100" absen={absen} key={key}>
                          <td className="border px-4 py-2">{text++}</td>
                          <td className="border px-4 py-2">{absen.waktu_kehadiran}</td>
                          <td className="border px-4 py-2">{absen.nama}</td>
                          <td className="border px-4 py-2">{absen.divisi}</td>
                          <td className="border px-4 py-2">{absen.laporan}</td>
                          <td className="border px-4 py-2 text-center">
                            <Link to={`/detail-absen/${absen.id}`}>
                              <button className="bg-blue-500 text-white p-2 rounded">
                                Show Detail
                              </button>
                            </Link>                          
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAbsen;
