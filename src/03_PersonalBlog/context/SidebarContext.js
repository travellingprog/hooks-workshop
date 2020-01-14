import React from 'react';

import BlogTitle from './BlogTitleContext';
import BirthdayCountdown from './BirthdayCountdownContext';

const Sidebar = () => (
  <aside>
    <BlogTitle />
    <BirthdayCountdown />
  </aside>
);

export default Sidebar;
