import React from 'react';

import styles from './PersonalBlog.module.css';
import StickyHeader from './StickyHeaderContext';
import MainContent from './MainContentContext';
import Sidebar from './SidebarContext';
import { UserProvider } from './UserContext1';

function PersonalBlog() {
  return (
    <div>
      <UserProvider>
        <div className={styles.stickyTop}>
          <StickyHeader />
        </div>
        <div className={styles.underSticky}>
          <div className={styles.main}>
            <MainContent />
          </div>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
        </div>
      </UserProvider>
    </div>
  );
}

export default PersonalBlog;
