import React from 'react';

import useSwapi from './useSwapi';

function Films() {
  const { data, loading } = useSwapi('films');

  if (loading) {
    return <div>Loading films...</div>
  }

  const films = data
    .results
    .slice()
    .sort((a, b) => a.release_date.localeCompare(b.release_date));

  return (
    <section>
      {films.map(film =>
        <div key={film.episode_id}>
          <header>
            <h2>{film.title}</h2>
            <p>Episode {film.episode_id}</p>
          </header>
          <dl>
            <dt>Director</dt>
            <dd>{film.director}</dd>

            <dt>Producer</dt>
            <dd>{film.producer}</dd>

            <dt>Release Date</dt>
            <dd>{film.release_date}</dd>
          </dl>
        </div>
      )}
    </section>
  );
}

export default Films;
