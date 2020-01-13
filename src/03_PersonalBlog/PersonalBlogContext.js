import React from 'react';

import StickyHeader from './StickyHeaderContext';
import MainContent from './MainContentContext';
import Sidebar from './SidebarContext';
import { UserProvider } from './UserContext1';

function PersonalBlog() {
  return (
    <div>
      <UserProvider>
        <StickyHeader />
        <MainContent />
        <Sidebar />
      </UserProvider>
    </div>
  );
}

export default PersonalBlog;
