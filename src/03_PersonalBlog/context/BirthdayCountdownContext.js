import React, { useContext } from 'react';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

import styles from '../BirthdayCountdown.module.css';
import { UserContext } from './UserContext';

function getDaysLeft(month, day) {
  const now = new Date();
  const nextBirthday = new Date(now.getFullYear(), month - 1, day);

  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  return differenceInCalendarDays(nextBirthday, now);
}

function BirthdayCountdown() {
  const { birthMonth, birthDay } = useContext(UserContext);

  return (
    <section className={styles.root}>
      There are
      <div className={styles.days}>{getDaysLeft(birthMonth, birthDay)}</div>
      days left until your birthday!
    </section>
  );
}

export default BirthdayCountdown;
