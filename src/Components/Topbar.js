import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { FaBus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Logout } from "./Logout";

const Topbar = ({
  showMenu,
  showMenus,
  showSideBar,
  user,
  isLoading,
  token,
  imageUrl,
}) => {

  return (
    <>
      <div
        className={
          showMenus
            ? "drop-shadow-lg rounded-sm fixed z-20 mt-[70px] bg-[#F3F3F3] text-center w-[200px] h-[80px] ml-[185vh]"
            : "hidden"
        }>
        <div className="hover:bg-[#e0dede] border border-white p-2 rounded">
          <h1>
            <Link to={'/profile'} onClick={showMenu}><FaUserAlt className="inline-block" /> User Profile</Link>
          </h1>
        </div>
        <Link onClick={showMenu}><Logout /></Link>
      </div>

      <header className={token ? "z-10 fixed top-0 left-64 right-0 bg-gray-900 text-white py-6 " : "hidden"}>
        <div className="container mx-auto flex justify-between ">
          <Link>
            <h1
              onClick={showSideBar}
              className="hidden">
              <GiHamburgerMenu className="mt-1" />
            </h1>
          </Link>
          <h3 className="font-bold font-logo text-xl ">
            <FaBus className="inline-block" /> SisipBis
          </h3>
          <h3 className="text-xl mr-4">
           {isLoading ? <h1 className="inline-block mr-2 rounded-full">Loading Picture ....</h1> : <img
              src={imageUrl}              
              width="35px"
              className="inline-block mr-2 rounded-full"
            />}
            
            {isLoading ? (
              <p className="inline-block">Loading...</p>
            ) : (
              <p className="inline-block mr-1">{user.nama}</p>
            )}
            <Link onClick={showMenu}>
              {!showMenus ? (
                <IoIosArrowDropdown className="inline-block hover:bg-gray-800" />
              ) : (
                <IoIosArrowDropup className="inline-block hover:bg-gray-800" />
              )}
            </Link>
          </h3>
        </div>
      </header>
    </>
  );
};

export default Topbar;
