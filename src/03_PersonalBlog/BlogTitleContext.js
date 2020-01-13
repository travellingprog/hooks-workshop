import React, { useContext } from 'react';

import { UserContext } from './UserContext1';

function BlogTitle() {
  const { name } = useContext(UserContext);

  return (
    <section>
      {name}'s Blog
    </section>
  );
}

export default BlogTitle;
