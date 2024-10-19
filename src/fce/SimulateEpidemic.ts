interface City {
    population: number;
    infected: number;
    neighbors: string[];
    susceptible: number;
}

interface Results {
    day: number;
    cities: Record<string, { susceptible: number; infected: number }>;
}

export const simulateEpidemic = (): Results[] => {
    const cities: Record<string, City> = {
        Plzen: {
            population: 170000,
            infected: 10,
            neighbors: ['Klatovy'],
            susceptible: 170000 - 10,
        },
        Klatovy: {
            population: 22000,
            infected: 0,
            neighbors: ['Plzen', 'Domazlice'],
            susceptible: 22000,
        },
        Domazlice: {
            population: 11000,
            infected: 0,
            neighbors: ['Klatovy'],
            susceptible: 11000,
        },
    };

    const betaIntra = 0.3;
    const theta = 0.05;
    const betaExponent = 1;
    const populationMax = Math.max(...Object.values(cities).map((city) => city.population));
    const numDays = 50;

    const simulationResults: Results[] = [];

    for (let day = 0; day < numDays; day++) {
        const dayResults: Results = { day: day + 1, cities: {} };
        const newValues: Record<string, { susceptible: number; infected: number }> = {};

        for (const cityName in cities) {
            const cityData = cities[cityName];
            let S_i = cityData.susceptible;
            let I_i = cityData.infected;
            const N_i = cityData.population;

            const delta_I_intra = betaIntra * S_i * I_i / N_i;

            let delta_I_inter = 0;
            for (const neighborName of cityData.neighbors) {
                const neighborData = cities[neighborName];
                const I_j = neighborData.infected;
                const N_j = neighborData.population;

                const delta_I_ji = theta * (N_j / populationMax) ** betaExponent * (I_j / N_j) * S_i;
                delta_I_inter += delta_I_ji;
            }

            const delta_I_total = Math.min(delta_I_intra + delta_I_inter, S_i);

            newValues[cityName] = {
                susceptible: S_i - delta_I_total,
                infected: I_i + delta_I_total,
            };

            dayResults.cities[cityName] = {
                susceptible: Math.floor(newValues[cityName].susceptible),
                infected: Math.floor(newValues[cityName].infected),
            };
        }

        for (const cityName in cities) {
            cities[cityName].susceptible = newValues[cityName].susceptible;
            cities[cityName].infected = newValues[cityName].infected;
        }

        simulationResults.push(dayResults);
    }

    return simulationResults;
};

