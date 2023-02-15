import React from "react"
import { Link } from "react-router-dom"
import { IoIosBuild } from "react-icons/io"
import { FaUserCog } from "react-icons/fa"
import { MdReportProblem } from "react-icons/md"

const Admin = () => {
    return (
        <>
            <h1 className="mt-5 ml-[18px]">Assalamualaikum, selamat datang Admin</h1>
            <div className="flex justify-center mx-[18px] mt-8">
                <Link to={'/list-user'}>
                    <div className="border rounded-md w-[600px] h-[200px] hover:bg-slate-300 bg-slate-200 mr-[24px]">
                        <h1 className="mt-5 ml-5 text-2xl"><FaUserCog className="inline-block"/> Data User</h1>
                        <p className="mt-2 ml-5">List User pengguna Aplikasi SisipBis</p>
                    </div>
                </Link>

                <Link to={'/pengaduan'}>
                    <div className="border rounded-md w-[600px] h-[200px] bg-slate-200 hover:bg-slate-300">
                        <h1 className="mt-5 ml-5 text-2xl"><MdReportProblem className="inline-block"/> Pengaduan</h1>
                        <p className="mt-2 ml-5">Pengaduan dari pengguna Aplikasi SisipBis</p>
                    </div>
                </Link>
            </div>

            <Link to={'/maintenances'}>
            <div className="flex justify-center">
                <div className="border rounded-md w-[1225px] h-[300px] mt-[24px] bg-slate-200 hover:bg-slate-300 mx-[27px]">
                    <h1 className="mt-5 ml-5 text-2xl"><IoIosBuild className="inline-block"/> Maintenance</h1>
                    <p className="mt-2 ml-5">List Maintenance Armada dan penambahan Armada</p>
                </div>
            </div>
            </Link>

        </>
    )
}
export default Admin