import React, { useState } from 'react';

import StickyHeader from './StickyHeader';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

function PersonalBlog() {
  const [name, setName] = useState('Anon');
  const [birthMonth, setBirthMonth] = useState(1);
  const [birthDay, setBirthDay] = useState(1);

  return (
    <div>
      <StickyHeader name={name} />
      <MainContent
        name={name}
        setName={setName}
        birthMonth={birthMonth}
        setBirthMonth={setBirthMonth}
        birthDay={birthDay}
        setBirthDay={setBirthDay}
      />
      <Sidebar name={name} birthDay={birthDay} birthMonth={birthMonth} />
    </div>
  );
}

export default PersonalBlog;
