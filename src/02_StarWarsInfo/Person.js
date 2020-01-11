import React from 'react';

import withSwapi from './withSwapi';

function Person({ data: person, loading }) {
  if (loading) {
    return <div>Loading person...</div>
  }

  return (
    <section>
      <h2>{person.name}</h2>
      <dl>
        <dt>Gender</dt>
        <dd>{person.gender}</dd>

        <dt>Birth Year</dt>
        <dd>{person.birth_year}</dd>

        <dt>Height</dt>
        <dd>{person.height} cm</dd>

        <dt>Mass</dt>
        <dd>{person.mass} kg</dd>

        <dt>Hair Color</dt>
        <dd>{person.hair_color}</dd>

        <dt>Eye Color</dt>
        <dd>{person.eye_color}</dd>
      </dl>
    </section>
  );
}

export default withSwapi(Person, 'people');
