import React, { useContext, useState } from 'react';
import DataContext from '../context/DataContext';

function Header() {
  // defines the context that will be used
  const {
    data,
    setData,
    setNameFilter,
    setHasNumericalFilter,
    filterByNumericValues,
    // setFilterByNumericValues,
    columns,
    setColumns,
    comparisons,
    filterList,
    setFilterList,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    numericalFilter,
    setNumericalFilter,
  } = useContext(DataContext);

  // defines the function that will handle the text input filter
  const handleTextInputChange = ({ target }) => {
    const { value } = target;
    setNameFilter({
      filterByName: {
        name: value,
      },
    });
  };

  // defines the function that will apply the numerical value filter, activated when the form is submited
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   setHasNumericalFilter(true);
  // }
  function handleButtonSubmit() {
    console.log('nada');
    setData(data.filter((planet) => {
      if (comparisonFilter === 'maior que') {
        return Number(planet[columnFilter]) > numericalFilter;
      } if (comparisonFilter === 'menor que') {
        return Number(planet[columnFilter]) < numericalFilter;
      }
      return Number(planet[columnFilter]) === Number(numericalFilter);
    }));
    setColumns(columns.filter((column) => column !== columnFilter));

    const newFilter = { columnFilter, comparisonFilter, numericalFilter };
    setFilterList([...filterList, newFilter]);
    console.log(newFilter, 'newFilter');
  }

  return (
    <header>
      { console.log(filterList, 'filterList') }
      <h1 id="app-title">Star Wars Planets Search</h1>
      <form>
        <input
          type="text"
          placeholder="Search by planet name"
          data-testid="name-filter"
          onChange={ handleTextInputChange }
        />
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ (e) => setColumnFilter(e.target.value) }
          value={ columnFilter }
        >
          {
            columns.map((column) => (
              <option key={ column } value={ column }>{column}</option>
            ))
          }
        </select>
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ (e) => setComparisonFilter(e.target.value) }
          value={ comparisonFilter }
        >
          {
            comparisons.map((comparison) => (
              <option key={ comparison } value={ comparison }>{comparison}</option>
            ))
          }
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ (e) => setNumericalFilter(e.target.value) }
          value={ numericalFilter.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleButtonSubmit }
        >
          Filter
        </button>
      </form>
      <div id="filter-list">
        a
      </div>
    </header>
  );
}

export default Header;
