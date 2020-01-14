import React from 'react';
import { Router } from "@reach/router";

import Article from './ArticleInitial';
import Profile from './ProfileInitial';

const MainContent = (props) => (
  <main>
    <Router>
      <Article path="/" />
      <Profile
        path="profile"
        name={props.name}
        setName={props.setName}
        birthMonth={props.birthMonth}
        setBirthMonth={props.setBirthMonth}
        birthDay={props.birthDay}
        setBirthDay={props.setBirthDay}
      />
    </Router>
  </main>
);

export default MainContent;
