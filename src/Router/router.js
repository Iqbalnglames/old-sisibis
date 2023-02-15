import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import User from '../Pages/User';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import Absensi from '../Pages/Absensi';
import Maintenance from '../Pages/Maintenance';
import Izin from '../Pages/Izin';
import AddArmada from '../Pages/AddArmada';
import Laporan from '../Pages/Laporan';
import Admin from '../Pages/Admin';
import Register from '../Pages/RegisterPegawai';
import ListUser from '../Pages/ListUser';
import ListAbsen from '../Pages/ListAbsen';
import DetailUser from '../Pages/DetailUser';
import axios from 'axios';

const Ruter = () => {
    const [user, setUser] = useState('');

    const token = localStorage.getItem('token')

    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user')
            .then((response) => {

                //set response user to state
                setUser(response.data);

            })
    }

    //memanggil data user dan mengirim ke local storage
    useState(() => {

        fetchData()
    }
    )
    return (
        <div>
            <Routes>
                <Route path='/*' element={<NotFound />} />

                <Route path='/login' element={<Login />} />

                <Route path='/user' element={<User user={user} />} />
                <Route path='/absensi' element={<Absensi />} />
                <Route path='/izin' element={<Izin />} />
                <Route path='/add-armada' element={<AddArmada />} />
                <Route path='/laporan' element={<Laporan />} />

                <Route path='/admin' element={<Admin />} />
                <Route path='/list-absen' element={<ListAbsen />} />
                <Route path='/list-izin' element={<ListAbsen />} />
                <Route path='/list-user' element={<ListUser />} />
                <Route path='/register' element={<Register />} />
                <Route path='/detail-user/:id' element={<DetailUser />} />

                <Route path='maintenance' element={<Maintenance />} />
                <Route path='detail-maintenance/:id' element={<DetailUser />} />


            </Routes>
        </div>
    )
}


export default Ruter