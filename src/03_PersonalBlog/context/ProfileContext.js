import React, { useContext, useEffect } from 'react';
import { Link } from "@reach/router";

import months from '../months.json';
import styles from '../Profile.module.css';
import { UserContext } from './UserContext';

function Profile() {
  const {
    name,
    setName,
    birthMonth,
    birthDay,
    setBirthMonth,
    setBirthDay,
  } = useContext(UserContext);

  function onNameChange(event) {
    setName(event.target.value);
  }

  function onMonthChange(event) {
    setBirthMonth(parseInt(event.target.value, 10));
  }

  function onDayChange(event) {
    setBirthDay(parseInt(event.target.value, 10));
  }

  useEffect(() => {
    const month = months[birthMonth - 1];
    setBirthDay(day => Math.min(day, month.days));
  }, [birthMonth, setBirthDay])

  const numDays = months[birthMonth - 1].days;

  return (
    <div className={styles.root}>
      <h1 className={styles.header}>Profile</h1>
      <div>
        <label className={styles.label}>
          Name
          <input type="text" value={name} onChange={onNameChange} className={styles.input} />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Birth Month
          <select type="text" value={birthMonth} onChange={onMonthChange} className={styles.select}>
            {months.map((month, i) =>
              <option key={i} value={i + 1}>{month.name}</option>
            )}
          </select>
        </label>
        <label className={styles.label}>
          Birth Day
          <select type="text" value={birthDay} onChange={onDayChange} className={styles.select}>
            {Array(numDays).fill().map((elem, i) =>
              <option key={i} value={i + 1}>{i + 1}</option>
            )}
          </select>
        </label>
      </div>
      <Link to="../" className={styles.link}>Return To Blog</Link>
    </div>
  );
}

export default Profile;
