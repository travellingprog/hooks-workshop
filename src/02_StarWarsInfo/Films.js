import React from 'react';

import styles from './Films.module.css';
import withSwapi from './withSwapi';

function Films({ data, loading }) {
  if (loading) {
    return <div>Loading films...</div>
  }

  const films = data
    .results
    .slice()
    .sort((a, b) => a.release_date.localeCompare(b.release_date));

  return (
    <section className={styles.root}>
      {films.map(film =>
        <div key={film.episode_id} className={styles.film}>
          <header>
            <h2 className={styles.title}>{film.title}</h2>
            <p className={styles.subtitle}>Episode {film.episode_id}</p>
          </header>
          <dl className={styles.list}>
            <dt className={styles.itemKey}>Director</dt>
            <dd className={styles.itemVal}>{film.director}</dd>

            <dt className={styles.itemKey}>Producer</dt>
            <dd className={styles.itemVal}>{film.producer}</dd>

            <dt className={styles.itemKey}>Release Date</dt>
            <dd className={styles.itemVal}>{film.release_date}</dd>
          </dl>
        </div>
      )}
    </section>
  );
}

export default withSwapi(Films, 'films');
