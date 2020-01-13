import React from 'react';
import { Link } from "@reach/router";

const StickyHeader = ({ name }) => (
  <section>
    Welcome, <Link to="profile">{name}</Link>!
  </section>
);

export default StickyHeader;
