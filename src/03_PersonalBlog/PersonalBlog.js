import React, { useState } from 'react';

import styles from './PersonalBlog.module.css';
import StickyHeader from './StickyHeader';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

function PersonalBlog() {
  const [name, setName] = useState('Anon');
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);

  return (
    <div>
      <div className={styles.stickyTop}>
        <StickyHeader name={name} />
      </div>
      <div className={styles.underSticky}>
        <div className={styles.main}>
          <MainContent
            name={name}
            setName={setName}
            birthMonth={birthMonth}
            setBirthMonth={setBirthMonth}
            birthDay={birthDay}
            setBirthDay={setBirthDay}
          />
        </div>
        <div className={styles.sidebar}>
          <Sidebar name={name} birthDay={birthDay} birthMonth={birthMonth} />
        </div>
      </div>
    </div>
  );
}

export default PersonalBlog;
