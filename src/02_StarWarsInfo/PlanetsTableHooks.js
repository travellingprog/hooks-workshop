import React, { useEffect } from 'react';

import useSwapi from './useSwapi';

const ITEMS_PER_PAGE = 10;

/** add commas to the population number, for legibility */
function displayPopulation(population) {
  // first, check if population is a string made up of only digits
  if (/^\d+$/.test(population)) {
    const chars = population.split('');
    let commaPosition = (population.length % 3) || 3;
    return chars.reduce((newStr, char, i) => {
      if (i === commaPosition) {
        commaPosition += 3;
        return `${newStr},${char}`;
      } else {
        return newStr + char;
      }
    }, '');
  }

  return population;
}

function PlanetsTable({ page, search, setNumPages }) {
  const { data, loading } = useSwapi('planets', { page, search });

  useEffect(() => {
    if (data && !loading) {
      const { count } = data;
      setNumPages(Math.ceil(count / ITEMS_PER_PAGE));
    }
  }, [data, loading, setNumPages]);

  if (loading) {
    return <div>Loading planets...</div>;
  } else {
    const { results: planets } = data;

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Population</th>
            <th scope="col">Climate</th>
            <th scope="col">Terrain</th>
          </tr>
        </thead>
        <tbody>
          {planets.map(planet =>
            <tr key={planet.url}>
              <th scope="row">{planet.name}</th>
              <td>{displayPopulation(planet.population)}</td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default PlanetsTable;
