import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect, Router } from "@reach/router";

import './index.css';
import styles from './App.module.css';

/* the components we'll work on */
import MemeCreator from './01_MemeCreator/MemeCreator';
import StarWarsInfo from './02_StarWarsInfo/StarWarsInfo';
import PersonalBlog from './03_PersonalBlog/PersonalBlog';

/* the results we'll expect */
// import MemeCreator from './01_MemeCreator/hooks/MemeCreatorHooks';
// import StarWarsInfo from './02_StarWarsInfo/hooks/StarWarsInfoHooks';
// import PersonalBlog from './03_PersonalBlog/context/PersonalBlogContext';

/* our initial state */
// import MemeCreator from './01_MemeCreator/initial/MemeCreatorInitial';
// import StarWarsInfo from './02_StarWarsInfo/initial/StarWarsInfoInitial';
// import PersonalBlog from './03_PersonalBlog/initial/PersonalBlogInitial';


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
