import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { HiOutlineClipboardCheck } from "react-icons/hi";

const ListIzin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [izin, setIzin] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    let text = ''
    for (let i = 1; i < 2; i++) {
      text =  i;
    }  
    const fetchData = async () => {

        //fetch user from Rest API
       await axios.get('http://localhost:8000/api/izin')
            .then((response) => {

                //set response user to state
                setIzin(response.data);
                setIsLoading(false);
            },[])
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
    <>
     
      <div className="flex justify-center">
        <div className="border rounded-md w-[1225px] pb-8 mt-[24px] bg-slate-200 mx-[27px]">
          <h1 className="mt-5 ml-5 text-2xl font-logo">
            <HiOutlineClipboardCheck className="inline-block" /> SisipBis Izin
          </h1>
          <p className="mt-2 ml-5">
            List Perizinan Pegawai
          </p> 
          <Link to={'/list-absen'}><button className="ml-10 mt-4 mb-4 p-2 rounded bg-[#D9D9D9] hover:bg-[#bfbfbf]">Kembali ke List Absensi</button></Link>        
          
          <div className="flex justify-center text-xl">
            <table className="table-auto w-[95%]">
              <thead className="">
                <tr  className="bg-gray-300">
                  <th className="px-4 py-2">Nomer</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Divisi</th>
                  <th className="px-4 py-2">Mulai Izin</th>
                  <th className="px-4 py-2">Akhir Izin</th>
                  <th className="px-4 py-2">Alasan</th>
                  <th className="px-4 py-2">Aksi</th>
                </tr>
              </thead>

              {isLoading ? (
                <>
                <td></td>
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
                    {izin &&
                      izin.map((izin, key) => (
                        <tr className="bg-gray-100" izin={izin} key={key}>
                          <td className="border px-4 py-2">{text++}</td>
                          <td className="border px-4 py-2">{izin.nama}</td>
                          <td className="border px-4 py-2">{izin.divisi}</td>
                          <td className="border px-4 py-2">{izin.mulai_izin}</td>
                          <td className="border px-4 py-2">{izin.akhir_izin}</td>
                          <td className="border px-4 py-2 text-center">
                            <Link to={`/detail-absen/${izin.id}`}>
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

export default ListIzin;
