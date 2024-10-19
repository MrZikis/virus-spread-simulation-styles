import {Outlet} from "react-router-dom";
import React from "react";
import logo from '../assets/logo.png'

const Layout = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <header className="flex justify-between items-center w-full h-20 px-20">
                <img src={logo} alt="logo" className="h-14"/>
                <button className="text-white px-11 py-2 rounded-full h-11 bg-blue-900">Join now</button>
            </header>
            <div className="w-full h-full">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout