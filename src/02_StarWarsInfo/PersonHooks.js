import React from 'react';

import styles from './Person.module.css';
import useSwapi from './useSwapi';

function Person({ id }) {
  const { data, loading } = useSwapi('people', { id });
  const person = data;

  if (loading) {
    return <div className={styles.root}>Loading person...</div>
  }

  return (
    <section className={styles.root}>
      <h2 className={styles.name}>{person.name}</h2>
      <dl className={styles.list}>
        <dt className={styles.itemKey}>Gender</dt>
        <dd className={styles.itemVal}>{person.gender}</dd>

        <dt className={styles.itemKey}>Birth Year</dt>
        <dd className={styles.itemVal}>{person.birth_year}</dd>

        <dt className={styles.itemKey}>Height</dt>
        <dd className={styles.itemVal}>{person.height} cm</dd>

        <dt className={styles.itemKey}>Mass</dt>
        <dd className={styles.itemVal}>{person.mass} kg</dd>

        <dt className={styles.itemKey}>Hair Color</dt>
        <dd className={styles.itemVal}>{person.hair_color}</dd>

        <dt className={styles.itemKey}>Eye Color</dt>
        <dd className={styles.itemVal}>{person.eye_color}</dd>
      </dl>
    </section>
  );
}

export default Person;
