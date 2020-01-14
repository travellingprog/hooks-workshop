import React, { useContext } from 'react';

import styles from './BlogTitle.module.css';
import { UserContext } from './UserContext1';

function BlogTitle() {
  const { name } = useContext(UserContext);

  return (
    <section className={styles.root}>
      {name}'s Blog
    </section>
  );
}

export default BlogTitle;
