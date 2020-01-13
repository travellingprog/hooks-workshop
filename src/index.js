import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router } from "@reach/router";

import './index.css';
import MemeCreator from './01_MemeCreator/MemeCreator';
import StarWarsInfo from './02_StarWarsInfo/StarWarsInfo';
import PersonalBlog from './03_PersonalBlog/PersonalBlog';

const App = () => (
  <div>
    <nav>
      <Link to="/meme-creator">Meme Creator</Link>{' '}
      <Link to="star-wars-info">Star Wars Info</Link>{' '}
      <Link to="personal-blog">Personal Blog</Link>
    </nav>
    <Router>
      <MemeCreator path="meme-creator" default />
      <StarWarsInfo path="star-wars-info" />
      <PersonalBlog path="personal-blog/*" />
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
