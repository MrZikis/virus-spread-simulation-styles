import React, { useState } from 'react';
import DistrictMap from '../components/Map';
import { FaBookmark } from 'react-icons/fa';

interface InfectionDataEntry {
    infected: number;
    coordinates: [number, number];
}

interface InfectionData {
    [districtName: string]: InfectionDataEntry;
}

const MainPage = () => {
    const [infectionData, setInfectionData] = useState<InfectionData>({});

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <main className="flex flex-col w-full h-[calc(100vh-80px)] px-14 mt-5">
                <h1 className="text-6xl">We care about your health</h1>

                <div className="flex mt-10 gap-10">
                    <div className="w-2/3 h-[calc(100vh-225px)] bg-gray-300 rounded-3xl">
                        <DistrictMap onSimulationComplete={setInfectionData} />
                    </div>

                    <div className="flex flex-col w-1/3 h-[calc(100vh-225px)] bg-white rounded-3xl p-10">
                        <div className="flex items-center justify-between pb-6 border-b-2 border-gray-400">
                            <div>
                                <h2 className="text-gray-900 text-lg">Pilsen Region</h2>
                                <p className="text-gray-600 text-lg">Czech Republic</p>
                            </div>
                            <FaBookmark className="text-2xl" />
                        </div>
                        <div className="flex flex-col gap-5 pt-6">
                            {Object.entries(infectionData).map(([district, data]) => (
                                <div key={district} className="flex justify-between">
                                    <h3 className="text-gray-900 text-lg font-bold">{district}</h3>
                                    <p className="text-gray-600 text-lg">{data.infected} cases</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
``