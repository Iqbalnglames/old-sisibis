import React, { useState } from "react";
import { FaUserPlus,FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {  Triangle } from "react-loader-spinner";

const Register = ({ showRegister }) => {
  const inputStyle ="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const alertStyle = "bg-red-300 text-red-600 p-2 rounded-sm";

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [user_photo, setUserPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [divisi, setDivisi] = useState("");
  const [validation, setValidation] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const registrasi = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("divisi", divisi);
    formData.append("user_photo", user_photo);

    await axios.post("http://127.0.0.1:8000/api/register", formData)
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: "Registrasi berhasil",
          });
          showRegister();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        //assign error to state "validation"
        setValidation(error.response.data);
      });
  };

  return (
    <div className="absolute p-[36px] z-1 bg-blur ">
      <div className="flex justify-center shadow-lg bg-slate-300 mx-[65vh] p-4 rounded-md">
        <form onSubmit={registrasi} encType="multipart/form-data" className="text-base">
          <div className="flex justify-center border-b-2 pb-3 border-black">
            <h1 className="mb-2 text-bold font-component2 ">
             <FaUserPlus className="inline-block" /> Registrasi Akun Pegawai
            </h1>
            <Link onClick={showRegister}>
              <h1 className="ml-[2vh] p-1 border-4 border-black rounded-lg">
                <FaTimes />
              </h1>
            </Link>
          </div>
          {
                            validation.message && (
                                <div className={alertStyle}>
                                    {validation.message}
                                </div>
                            )
                        }

          <label className="block ">Nama</label>
          <input
            type="text"
            placeholder="Nama Pegawai Baru"
            className={inputStyle}
            onChange={(e) => setNama(e.target.value)}
          />
           {
                            validation.nama && (
                                <div className={alertStyle}>
                                    {validation.nama[0]}
                                </div>
                            )
                        }

          <label className="block">Email</label>
          <input
            type="email"
            placeholder="Email Pegawai"
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            />
            {
                            validation.email && (
                                <div className={alertStyle}>
                                    {validation.email[0]}
                                </div>
                            )
                        }

          <label className="block">Foto User</label>
          <input
            type="file"
            placeholder="Foto Pegawai"
            className={inputStyle}
            onChange={(e) => setUserPhoto(e.target.files[0])}
            />

          <label className="block">Username</label>
          <input
            type="text"
            placeholder="Username untuk akun pegawai baru"
            className={inputStyle}
            onChange={(e) => setUsername(e.target.value)}
            />
            {
                             validation.username && (
                                 <div className={alertStyle}>
                                     {validation.username[0]}
                                 </div>
                             )
                         }

          <label className="block">Password</label>
          <input
            type="password"
            placeholder="Password pengguna"
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
          />
          {
                            validation.password && (
                                <div className={alertStyle}>
                                    {validation.password[0]}
                                </div>
                            )
                        }

          <label className="block">Ulangi Password</label>
          <input
            type="password"
            placeholder="Ulangi Password"
            className={inputStyle}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {
                            validation.password && (
                                <div className={alertStyle}>
                                    {validation.password[1]}
                                </div>
                            )
                        }

          <label className="block">Divisi</label>
          <input
            type="text"
            placeholder="Divisi Pegawai"
            className={inputStyle}
            onChange={(e) => setDivisi(e.target.value)}
          />
          {
                            validation.divisi && (
                                <div className={alertStyle}>
                                    {validation.divisi[0]}
                                </div>
                            )
                        }
                        {isLoading ? <button type="submit" disabled className="mt-4 p-2 rounded bg-[#e9e9e9] flex">
            <h1 className="inline mr-1">Loading... </h1><Triangle            
  height={20}
  width={20}
  color='#0d0959'
/>
          </button> : <button type="submit" className="mt-4 p-2 rounded bg-[#D9D9D9] hover:bg-[#bfbfbf]">
            Registrasi
          </button>}
          
        </form>
      </div>
    </div>
  );
};

export default Register;
