import React, { useState, useEffect } from "react";
import "./App.css";
import Ruter from "./Router/Routers";
import axios from "axios";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";

function App() {
  const [showMenus, setShowMenu] = useState();
  const [showMenuSideBar, setShowMenuSideBar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  const [imageUrl, setImageUrl] = useState('')

  const showMenu = () => {
    setShowMenu(!showMenus);
  };
  const showSideBar = () => {
    setShowMenuSideBar(!showMenuSideBar);
  };
  

  
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    //fetch user from Rest API
    let response =  await axios.get("http://localhost:8000/api/user")
      //set response user to state      
      setUser(response.data);
      setIsLoading(false)
      
    }
    const showImage = async () => {
    
      const response = await axios.get(`http://localhost:8000/api/user-image/${user.user_photo}`, 
      {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
      setIsLoading(false);
    
  
  }
    
  //memanggil data user dan mengirim ke local storage

  useEffect(()=>{
    
      showImage()
      fetchData()
   

  },[isLoading])


  return (
    <>
      <div className="h-screen flex">
        <Sidebar showMenuSideBar={showMenuSideBar} token={token} />
        <div className="flex-1 bg-gray-100">
          <Topbar
            imageUrl={imageUrl}
            user={user}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            showMenu={showMenu}
            showSideBar={showSideBar}
            showMenus={showMenus}
            token={token}
          />
          <div className="absolute left-64 top-24 z-0">            
          <Ruter user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
