import React from 'react';

import styles from './BlogTitle.module.css';

const BlogTitle = ({ name }) => (
  <section className={styles.root}>
    {name}'s Blog
  </section>
);

export default BlogTitle;
