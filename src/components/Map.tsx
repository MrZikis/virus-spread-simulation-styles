import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const Map = () => {
    const [geographies, setGeographies] = useState([]);

    return (
        <ComposableMap>
            <Geographies geography={geographies}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#EAEAEC"
                            stroke="#FFFFFF"
                            onClick={() => alert(`Okres: ${geo.properties.NAME_2}`)}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    );
};

export default Map;
