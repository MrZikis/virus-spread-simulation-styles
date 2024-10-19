import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import { FeatureCollection, Geometry } from 'geojson';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

interface DistrictProperties {
    name: string;
    center?: [number, number];
}

type DistrictsGeoJSON = FeatureCollection<Geometry, DistrictProperties>;

interface InfectionDataEntry {
    infected: number;
    coordinates: [number, number];
}

interface InfectionData {
    [districtName: string]: InfectionDataEntry;
}

interface DistrictMapProps {
    onSimulationComplete: (data: InfectionData) => void;
}

const simulateEpidemic = (): InfectionData => {
    const cities: Record<string, InfectionDataEntry> = {
        'Plzen': { infected: 10, coordinates: [13.377, 49.738] },
        'Klatovy': { infected: 5, coordinates: [13.293, 49.395] },
        'Domazlice': { infected: 2, coordinates: [12.931, 49.44] },
    };

    const betaIntra = 0.3;
    const theta = 0.05;
    const numDays = 50;

    for (let day = 0; day < numDays; day++) {
        const newValues: Record<string, { infected: number }> = {};

        for (const cityName in cities) {
            const cityData = cities[cityName];
            let I_i = cityData.infected;
            const delta_I_intra = betaIntra * I_i;

            let delta_I_inter = 0;
            for (const neighborName in cities) {
                const neighborData = cities[neighborName];
                const I_j = neighborData.infected;
                delta_I_inter += theta * I_j * I_i;
            }

            const delta_I_total = Math.min(delta_I_intra + delta_I_inter, 1000);
            newValues[cityName] = { infected: I_i + delta_I_total };
        }

        for (const cityName in cities) {
            cities[cityName].infected = newValues[cityName].infected;
        }
    }

    return cities;
};

const DistrictMap: React.FC<DistrictMapProps> = ({ onSimulationComplete }) => {
    const [districts, setDistricts] = useState<DistrictsGeoJSON | null>(null);
    const [infectionData, setInfectionData] = useState<InfectionData>({});

    useEffect(() => {
        fetch('/data/czech_districts.json')
            .then((response) => response.json())
            .then((data: DistrictsGeoJSON) => {
                data.features = data.features.map((feature) => {
                    const centroid = turf.centroid(feature);
                    feature.properties.center = centroid.geometry.coordinates as [number, number];
                    return feature;
                });
                setDistricts(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleSimulation = () => {
        if (districts) {
            const simulationResults = simulateEpidemic();
            const updatedInfectionData: InfectionData = {};

            districts.features.forEach((feature) => {
                const districtName = feature.properties.name;
                const simulatedData = simulationResults[districtName] || {
                    infected: Math.floor(Math.random() * 1000),
                    coordinates: feature.properties.center as [number, number],
                };

                updatedInfectionData[districtName] = {
                    infected: simulatedData.infected,
                    coordinates: feature.properties.center as [number, number],
                };
            });

            setInfectionData(updatedInfectionData);
            onSimulationComplete(updatedInfectionData); // Send data to MainPage
        }
    };

    const renderInfectionMarkers = () => {
        return Object.keys(infectionData).map((districtName, index) => {
            const data = infectionData[districtName];
            const radius = Math.sqrt(data.infected) * 0.05;
            return (
                <CircleMarker
                    key={index}
                    center={[data.coordinates[1], data.coordinates[0]]}
                    radius={radius}
                    color="red"
                    fillColor="red"
                    fillOpacity={0.5}
                >
                    <Popup>
                        <strong>{districtName}</strong>
                        <br />
                        Nakažení: {data.infected}
                    </Popup>
                </CircleMarker>
            );
        });
    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <button onClick={handleSimulation} style={{ position: 'absolute', zIndex: 1000, margin: 10 }}>
                Spustit simulaci
            </button>
            <MapContainer
                center={[49.8175, 15.4730]}
                zoom={7}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {districts && <GeoJSON data={districts} />}
                {renderInfectionMarkers()}
            </MapContainer>
        </div>
    );
};

export default DistrictMap;
