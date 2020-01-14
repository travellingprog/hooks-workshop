import React, { useContext } from 'react';
import { Link } from "@reach/router";

import styles from '../StickyHeader.module.css';
import { UserContext } from './UserContext';

function StickyHeader() {
  const { name } = useContext(UserContext);

  return (
    <section className={styles.root}>
      Welcome, <Link to="profile" className={styles.link}>{name}</Link>!
    </section>
  );
}

export default StickyHeader;
