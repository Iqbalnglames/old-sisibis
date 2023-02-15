import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { FaUserCog } from "react-icons/fa";
import Register from "./Register";

const ListUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUser] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showRegisterPage, setShowRegisterPage] = useState();
  const controller = new AbortController('')
  let text = ''
  for (let i = 1; i < 2; i++) {
    text =  i;
  }  
  
 const showRegister = () => {
    setShowRegisterPage(!showRegisterPage);
  };

  const fetchData = async () => {
    //fetch user from Rest API
    const response = await axios.get("http://localhost:8000/api/user-list", {signal: controller.signal})
      //set response user to state
      setUser(response.data);
      setIsLoading(false);
    
  };

  //memanggil data user dan mengirim ke local storage
  useEffect(() => {
    fetchData();
  },[!showRegisterPage]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
     {showRegisterPage ? <Register showRegister={showRegister}/> : null}
      <div className="flex justify-center">
        <div className="border rounded-md w-[1225px] pb-8 mt-[24px] bg-slate-200 mx-[27px]">
          <h1 className="mt-5 ml-5 text-2xl font-logo">
            <FaUserCog className="inline-block" /> SisipBis Users
          </h1>
          <p className="mt-2 ml-5">
            List Dan Registrasi Akun Pegawai
          </p>
        <Link onClick={showRegister}><button className="ml-10 mt-4 mb-4 p-2 rounded bg-[#D9D9D9] hover:bg-[#bfbfbf]">Registrasi User</button></Link> 
          <div className="flex justify-center text-xl">
            <table className="table-auto w-[95%]">
              <thead>
                <tr  className="bg-gray-300">
                  <th className="px-2 py-2">Nomer</th>
                  <th className="px-4 py-2">Nama</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Divisi</th>
                  <th className="px-4 py-2">Email</th>
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
                    {users &&
                      users.map((user, key) => (
                        
                        <tr className="bg-gray-100" text={text} user={user} key={key}>
                          <td className="border px-2 py-2">{text++}</td>
                          <td className="border px-4 py-2">{user.nama}</td>
                          <td className="border px-4 py-2">{user.username}</td>
                          <td className="border px-4 py-2">{user.divisi}</td>
                          <td className="border px-4 py-2">{user.email}</td>
                          <td className="border px-4 py-2">
                            <Link to={`/detail-user/${user.id}`}>
                              <button className="bg-blue-500 text-white p-2 rounded">
                                Show User
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

export default ListUser;
