import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect, Router } from "@reach/router";

import './index.css';
import styles from './App.module.css';
import MemeCreator from './01_MemeCreator/MemeCreator';
import StarWarsInfo from './02_StarWarsInfo/StarWarsInfo';
import PersonalBlog from './03_PersonalBlog/PersonalBlog';

const isActive = ({ isPartiallyCurrent }) => ({
  className: `${styles.link} ${isPartiallyCurrent ? styles.linkIsActive : ''}`,
});

const App = () => (
  <div>
    <nav className={styles.nav}>
      <Link to="meme-creator" getProps={isActive}>Meme Creator</Link>
      <Link to="star-wars-info" getProps={isActive}>Star Wars Info</Link>
      <Link to="personal-blog" getProps={isActive}>Personal Blog</Link>
    </nav>
    <Router>
      <MemeCreator path="meme-creator" />
      <StarWarsInfo path="star-wars-info" />
      <PersonalBlog path="personal-blog/*" />
      <Redirect from="/" to="meme-creator" noThrow />
    </Router>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
