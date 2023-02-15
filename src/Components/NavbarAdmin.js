import React from "react";
import { FaBus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { Logout } from "./Logout";

const NavbarAdmin = ({ user, isLoading }) => {


    const navStyle = 'mx-2 hover:underline hover:underline-offset-4 inline-block'
    const userStyle = 'mx-2 hover:underline-offset-4 inline-block'
    return (
        <>
            <header className="fixed top-0 right-0 left-0 z-10">
                <nav className='flex py-5 justify-between bg-[#52b2fb] content-center items-center' >
                    <div className='ml-2 text-white text-4xl'>
                        <Link to="/admin"><h1 className="font-logo"><FaBus className="inline-block" /> SisipBis</h1></Link>
                    </div>
                    <div className='text-white'>
                        <ul>
                            <Link to='/list-absen'><li className={navStyle} >Absensi</li></Link>
                            <Link to='/maintenance'><li className={navStyle} >Laporan Maintenance</li> </Link>
                            <Link to='/laporan'><li className={navStyle} >Laporan Pekerja</li></Link>
                            |
                            {isLoading ? <li className={userStyle}>Loading.....</li> : <li className={userStyle} >{user.nama}</li>}
                            <Logout />
                        </ul>

                    </div>
                </nav>
            </header>
        </>
    )
}

export default NavbarAdmin