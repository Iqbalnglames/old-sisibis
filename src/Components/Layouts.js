import React from "react";
import { Outlet } from "react-router-dom";


const Layouts = () => {
   

    return (
        
       <main className="bg-blue">
           <Outlet />
       </main>
       
        
        
    )
}

export default Layouts