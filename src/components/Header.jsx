import React, { useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';

function Header() {
  // defines the context that will be used
  const {
    data,
    setData,
    setNameFilter,
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
    unfilteredData,
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

  useEffect(() => {
    if (filterList.length === 0) {
      setData(unfilteredData);
    }
    filterList.forEach((filter) => {
      setData(data.filter((planet) => {
        if (filter.comparisonFilter === 'maior que') {
          return Number(planet[filter.columnFilter]) > filter.numericalFilter;
        } if (filter.comparisonFilter === 'menor que') {
          return Number(planet[filter.columnFilter]) < filter.numericalFilter;
        }
        return Number(planet[filter.columnFilter]) === Number(filter.numericalFilter);
      }));
    });
  }, [filterList]);

  function handleButtonSubmit() {
    setColumns(columns.filter((column) => column !== columnFilter));
    const newFilter = { columnFilter, comparisonFilter, numericalFilter };
    setFilterList([...filterList, newFilter]);
  }

  function handleDeleteFilter(parameter) {
    setFilterList(filterList.filter((filter) => filter.columnFilter !== parameter));
  }

  return (
    <header>
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
        {filterList.map((filter, index) => (
          <p key={ index } data-testid="filter">
            {`${filter.columnFilter}
              ${filter.comparisonFilter}
              ${filter.numericalFilter}`}
            <button
              type="button"
              onClick={ () => handleDeleteFilter(filter.columnFilter) }
            >
              X
            </button>
          </p>
        ))}
      </div>
    </header>
  );
}

export default Header;
