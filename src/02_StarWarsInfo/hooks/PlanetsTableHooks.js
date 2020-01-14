import React, { useEffect } from 'react';

import styles from '../PlanetsTable.module.css';
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
            <th scope="col" className={`${styles.header} ${styles.headerFirstCol}`}>Name</th>
            <th scope="col" className={styles.header}>Population</th>
            <th scope="col" className={styles.header}>Climate</th>
            <th scope="col" className={styles.header}>Terrain</th>
          </tr>
        </thead>
        <tbody>
          {planets.map(planet =>
            <tr key={planet.url}>
              <th scope="row" className={styles.name}>{planet.name}</th>
              <td className={`${styles.val} ${styles.valNum}`}>
                {displayPopulation(planet.population)}
              </td>
              <td className={styles.val}>{planet.climate}</td>
              <td className={styles.val}>{planet.terrain}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default PlanetsTable;
