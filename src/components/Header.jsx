import React, { useContext } from 'react';
import DataContext from '../context/DataContext';

function Header() {
  const { setNameFilter } = useContext(DataContext);
  return (
    <>
      <h1>Star Wars Planets Search</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (event) => setNameFilter(event.target.value) }
      />

      <select name="numerical-filter" id="numerical-filter" data-testid="column-filter">
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diamenter</option>
        <option value="rotation_period">Rotarion Period</option>
        <option value="surface_water">Surface Water</option>
      </select>
      <select name="more-or-less" id="more-or-less" data-testid="comparison-filter">
        <option value="maior que">Greater than</option>
        <option value="menor que">Less than</option>
        <option value="igual a">Equal to</option>
      </select>
      <input type="text" data-testid="value-filter" />
      <button type="submit" data-testid="button-filter">Filter</button>
    </>
  );
}

export default Header;
