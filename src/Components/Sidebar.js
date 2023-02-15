import React from "react";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { IoIosBuild } from "react-icons/io";
import { FaBus, FaUserCog } from "react-icons/fa";
import { MdReportProblem } from 'react-icons/md'
import { Link } from "react-router-dom";

const Sidebar = ({ token }) => {
  return (
    <>
      <div className={ token ? "fixed top-0 bottom-0 w-64 bg-gray-800 text-white py-10 text-center": "hidden"}>
          <Link to={'/admin'}>
          <h3 className="font-bold font-logo text-xl mb-6">
            <FaBus className="inline-block" /> SisipBis
          </h3>
          </Link>
          <nav>
            <ul>
              <li className="mt-2">
                <Link to={'/list-user'} className="block border-t-2 border-gray-600 py-5 px-3 text-white hover:bg-gray-700">
                  <FaUserCog className="inline-block" /> DATA USER
                </Link>
              </li>
              <li className="">
                <Link to={'/list-absen'} className="block border-t-2 border-gray-600 py-5 px-3 text-white hover:bg-gray-700">
                  <HiOutlineClipboardCheck className="inline-block" /> ABSENSI
                </Link>
              </li>
              <li className="">
                <Link to={'/maintenances'} className="block border-t-2 border-gray-600 py-5 px-3 text-white hover:bg-gray-700">
                  <IoIosBuild className="inline-block" /> MAINTENANCE
                </Link>
              </li>
              <li className="">
                <Link to={'/pengaduan'} className="border-y-2 border-gray-600 block py-5 px-3 text-white hover:bg-gray-700">
                  <MdReportProblem className="inline-block" /> PENGADUAN
                </Link>
              </li>
            </ul>
            <h1 className="mt-[100%] text-sm">
              BackEnd and FrontEnd builded by TCBProject
            </h1>
          </nav>
        </div>
    </>
  );
};

export default Sidebar;
