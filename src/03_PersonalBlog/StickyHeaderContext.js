import React, { useContext } from 'react';
import { Link } from "@reach/router";

import { UserContext } from './UserContext1';

function StickyHeader() {
  const { name } = useContext(UserContext);

  return (
    <section>
      Welcome, <Link to="profile">{name}</Link>!
    </section>
  );
}

export default StickyHeader;
