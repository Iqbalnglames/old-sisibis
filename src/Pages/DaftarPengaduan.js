import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { MdReportProblem } from 'react-icons/md'

const Pengaduan = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [pengaduan, setPengaduan] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    let text = "";

    for (let i = 1; i < 2; i++) {
      text =  i;
    }


    const fetchData = async () => {

        //fetch user from Rest API
       await axios.get('http://localhost:8000/api/pengaduan')
            .then((response) => {

                //set response user to state
                setPengaduan(response.data);
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
            <MdReportProblem className="inline-block" /> SisipBis Pengaduan
          </h1>
          <p className="mt-2 ml-5 mb-5">
Daftar Pengaduan pegawai selama bekerja
          </p>        
          <div className="flex justify-center text-xl">
            <table className="table-fixed w-[95%]">
              <thead className="">
                <tr  className="bg-gray-300">
                  <th className="px-4 py-2">Nomer</th>
                  <th className="px-4 py-2">Nama Pelapor</th>
                  <th className="px-4 py-2">divisi</th>
                  <th className="px-4 py-2">laporan</th>
                  <th className="px-4 py-2">Status Pengaduan</th>
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
                    {pengaduan &&
                      pengaduan.map((pengaduan, key) => (
                        <tr className="bg-gray-100" pengaduan={pengaduan} key={key}>
                          <td className="border px-4 py-2">{text}</td>
                          <td className="border px-4 py-2">{pengaduan.nama_pelapor}</td>
                          <td className="border px-4 py-2">{pengaduan.divisi}</td>
                          <td className="border px-4 py-2">{pengaduan.laporan}</td>
                          <td className="border px-4 py-2">{pengaduan.status}</td>
                          <td className="border px-4 py-2 text-center">
                            <Link to={`/detail-absen/${pengaduan.id}`}>
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

export default Pengaduan;
