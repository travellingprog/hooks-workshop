import React from 'react';

import styles from './StarWarsInfo.module.css';
import Films from './Films';
import Person from './Person';
import Planets from './Planets';

function StarWarsInfo() {
  return (
    <main className={styles.root}>
      <h1 className={styles.header}>The Films</h1>
      <Films />

      <h1 className={styles.header}>The Main Heroes</h1>
      <div className={styles.peopleContainer}>
        <Person id={1} />
        <Person id={5} />
        <Person id={14} />
        <Person id={10} />
        <Person id={85} />
      </div>

      <h1 className={styles.header}>The Planets</h1>
      <Planets />
    </main>
  );
}

export default StarWarsInfo;
