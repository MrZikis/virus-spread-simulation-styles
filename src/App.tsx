import React from 'react';

import { FaBookmark } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <header className="flex justify-between items-center w-full h-20 px-20">
            <h1 className="text-color1 text-3xl font-medium">Pathogen</h1>
            <button className="bg-black text-white px-11 py-2 rounded-full h-11">Join now</button>
        </header>
        <main className="flex flex-col w-full h-[calc(100vh-80px)] px-14 mt-5">
            <h1 className="text-6xl">We care about your health</h1>

            <div className="flex mt-10 gap-10">
                <div className="w-2/3 h-[calc(100vh-225px)] bg-gray-300 rounded-3xl">
                    <Map/>
                </div>

                <div className="flex flex-col w-1/3 h-[calc(100vh-225px)] bg-white rounded-3xl p-10">
                    <div className="flex items-center justify-between pb-6">
                        <div>
                            <h2 className="text-gray-900 text-lg">Pilsen Region</h2>
                            <p className="text-gray-600 text-lg">Czech Republic</p>
                        </div>
                        <FaBookmark className="text-2xl"/>
                    </div>
                    <div className="flex justify-between gap-5 pt-6">
                        <div className="w-1/3">
                            <h3 className="text-gray-900 text-lg font-bold">8K</h3>
                            <p className="text-gray-600 text-lg">Daily cases</p>
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-gray-900 text-lg font-bold">8K</h3>
                            <p className="text-gray-600 text-lg">Daily cases</p>
                        </div>
                        <div className="w-1/3">
                            <h3 className="text-gray-900 text-lg font-bold">8K</h3>
                            <p className="text-gray-600 text-lg">Daily cases</p>
                        </div>
                    </div>
                    <div className="flex pt-6">
                        <h1 className="text-gray-900 text-3xl font-bold">1,038,792</h1>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;
