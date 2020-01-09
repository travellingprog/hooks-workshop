import React from 'react';

import Films from './Films';
import Person from './Person';
import Planets from './Planets';

function StarWarsInfo() {
  return (
    <main>
      <h1>The Films</h1>
      <Films />

      <h1>The Main Heroes</h1>
      <Person id={1} />
      <Person id={5} />
      <Person id={14} />
      <Person id={10} />
      <Person id={85} />

      <h1>The Planets</h1>
      <Planets />
    </main>
  );
}

export default StarWarsInfo;
