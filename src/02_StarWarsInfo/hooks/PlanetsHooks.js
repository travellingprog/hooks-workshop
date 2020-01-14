import React, { useState } from 'react';
import useDebounce from 'react-use/lib/useDebounce';

import styles from '../Planets.module.css';
import PlanetsTable from './PlanetsTableHooks';

function Planets() {
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  function onSearchInput(event) {
    setSearch(event.target.value);
  }

  function onPageSelect(event) {
    setPage(event.target.value);
  }

  useDebounce(() => {
    setPage(1);
    setNumPages(0); // since page count is unknown
    setDebouncedSearch(search);
  }, 500, [search])

  return (
    <section className={styles.root}>
      <div className={styles.form}>
        <label className={styles.label}>
          Search: <br />
          <input type="text" value={search} onChange={onSearchInput} className={styles.search} />
        </label>
        <br />
        <label className={styles.label}>
          Page:
          <select value={page} onChange={onPageSelect} disabled={numPages < 1}
          className={styles.select}>
            { Array(numPages).fill().map((elem, i) =>
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            )}
          </select>
        </label>
      </div>

      <PlanetsTable page={page} search={debouncedSearch} setNumPages={setNumPages} />
    </section>
  );
}

export default Planets;
