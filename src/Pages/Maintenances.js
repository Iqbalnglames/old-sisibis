import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { IoIosBuild } from "react-icons/io";

const Maintenance = ({isLoading, maintenances }) => {
  
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    let text = ''
    for (let i = 1; i < 2; i++) {
      text =  i;
    }  

  
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
          <IoIosBuild className="inline-block"/> SisipBis Maintenances
          </h1>
          <p className="mt-2 ml-5 mb-5">
            List Maintenance Armada
          </p>        
          <div className="flex justify-center text-xl">
            <table className="table-fixed w-[95%]">
              <thead className="">
                <tr  className="bg-gray-300">
                  <th className="px-4 py-2">Nomer</th>
                  <th className="px-4 py-2">Nomer Lambung</th>
                  <th className="px-4 py-2">Nama Chasis</th>
                  <th className="px-4 py-2">Status Armada</th>
                  <th className="px-4 py-2">Catatan</th>
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
                    {maintenances &&
                      maintenances.map((maintenance, key) => (
                        <tr className="bg-gray-100" maintenance={maintenance} key={key}>
                          <td className="border px-4 py-2">{text++}</td>
                          <td className="border px-4 py-2">{maintenance.nomer_armada}</td>
                          <td className="border px-4 py-2">{maintenance.nama_chasis}</td>
                          <td className={`${maintenance.status === 'NEED MAINTENANCE' ? 'text-[red] border px-4 py-2' : 'border px-4 py-2 text-blue-600'}`}>{maintenance.status}</td>
                          <td className="border px-4 py-2">{maintenance.catatan}</td>
                          <td className="border px-4 py-2 text-center">
                            <Link to={`/detail-maintenances/${maintenance.id}`}>
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

export default Maintenance;
