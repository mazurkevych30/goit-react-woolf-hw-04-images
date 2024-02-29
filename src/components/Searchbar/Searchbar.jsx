import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ getSearchRequest }) => {
  const [search, setSearch] = useState('');

  const handleInput = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    getSearchRequest(search);
    setSearch('');
    e.target.reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="search"
          onChange={handleInput}
          placeholder="Search images and photos"
          value={search}
        />
      </form>
    </header>
  );
};

export default Searchbar;
