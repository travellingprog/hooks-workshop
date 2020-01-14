import React from 'react';

import BlogTitle from './BlogTitleInitial';
import BirthdayCountdown from './BirthdayCountdownInitial';

const Sidebar = ({ name, birthDay, birthMonth }) => (
  <aside>
    <BlogTitle name={name} />
    <BirthdayCountdown birthMonth={birthMonth} birthDay={birthDay} />
  </aside>
);

export default Sidebar;
