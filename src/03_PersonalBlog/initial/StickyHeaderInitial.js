import React from 'react';
import { Link } from "@reach/router";

import styles from '../StickyHeader.module.css';

const StickyHeader = ({ name }) => (
  <section className={styles.root}>
    Welcome, <Link to="profile" className={styles.link}>{name}</Link>!
  </section>
);

export default StickyHeader;
