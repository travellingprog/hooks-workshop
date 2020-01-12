import React from 'react';

import BlogTitle from './BlogTitle';
import BirthdayCountdown from './BirthdayCountdown';

const Sidebar = ({ name, birthDay, birthMonth }) => (
  <aside>
    <BlogTitle name={name} />
    <BirthdayCountdown birthMonth={birthMonth} birthDay={birthDay} />
  </aside>
);

export default Sidebar;
