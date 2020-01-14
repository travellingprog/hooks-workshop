import React from 'react';
import { Router } from "@reach/router";

import Article from './ArticleContext';
import Profile from './ProfileContext';

const MainContent = (props) => (
  <main>
    <Router>
      <Article path="/" />
      <Profile path="profile" />
    </Router>
  </main>
);

export default MainContent;
