export interface City {
    population: number;
    infected: number;
    neighbors: string[];
    susceptible: number;
}

export interface Cities {
    [key: string]: City;
}

import { Cities } from './types';

const simulateEpidemic = (cities: Cities, numDays: number): any[] => {
    const betaIntra = 0.3;
    const theta = 0.05;
    const betaExponent = 1;
    const populationMax = Math.max(...Object.values(cities).map(city => city.population));

    const results = [];

    for (let day = 0; day < numDays; day++) {
        const dayResults: any = { Day: day + 1 };
        const newValues: any = {};

        for (const cityName in cities) {
            const city = cities[cityName];
            const S_i = city.susceptible;
            const I_i = city.infected;
            const N_i = city.population;

            const delta_I_intra = betaIntra * S_i * I_i / N_i;

            let delta_I_inter = 0;

            for (const neighborName of city.neighbors) {
                const neighbor = cities[neighborName];
                const I_j = neighbor.infected;
                const N_j = neighbor.population;

                if (N_j > 0) {
                    delta_I_inter += theta * (N_j / populationMax) ** betaExponent * (I_j / N_j) * S_i;
                }
            }

            let delta_I_total = delta_I_intra + delta_I_inter;

            delta_I_total = Math.min(delta_I_total, S_i);

            const S_i_next = S_i - delta_I_total;
            const I_i_next = I_i + delta_I_total;

            newValues[cityName] = {
                susceptible: S_i_next,
                infected: I_i_next
            };

            dayResults[cityName] = {
                Neinfikovaní: Math.floor(S_i_next),
                Infikovaní: Math.floor(I_i_next)
            };
        }

        for (const cityName in cities) {
            cities[cityName].susceptible = newValues[cityName].susceptible;
            cities[cityName].infected = newValues[cityName].infected;
        }

        results.push(dayResults);
    }

    return results;
};


export default simulateEpidemic;
