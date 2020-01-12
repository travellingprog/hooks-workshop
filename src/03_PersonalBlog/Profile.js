import React, { useEffect } from 'react';
import { Link } from "@reach/router";

const months = [
  {
    name: 'January',
    days: 31,
  },
  {
    name: 'February',
    days: 29,
  },
  {
    name: 'March',
    days: 31,
  },
  {
    name: 'April',
    days: 30,
  },
  {
    name: 'May',
    days: 31,
  },
  {
    name: 'June',
    days: 30,
  },
  {
    name: 'July',
    days: 31,
  },
  {
    name: 'August',
    days: 31,
  },
  {
    name: 'September',
    days: 30,
  },
  {
    name: 'October',
    days: 31,
  },
  {
    name: 'November',
    days: 30,
  },
  {
    name: 'December',
    days: 31,
  },
];

function Profile(props) {
  const {
    name,
    birthMonth,
    birthDay,
    setName,
    setBirthMonth,
    setBirthDay,
  } = props;

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
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={onNameChange} />
      </label>
      <label>
        Birth Month:
        <select type="text" value={birthMonth} onChange={onMonthChange}>
          {months.map((month, i) =>
            <option key={i} value={i + 1}>{month.name}</option>
          )}
        </select>
      </label>
      <label>
        Birth Day:
        <select type="text" value={birthDay} onChange={onDayChange}>
          {Array(numDays).fill().map((elem, i) =>
            <option key={i} value={i + 1}>{i + 1}</option>
          )}
        </select>
      </label>
      <Link to="../">Return To Blog</Link>
    </div>
  );
}

export default Profile;
