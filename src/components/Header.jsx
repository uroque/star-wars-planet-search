import React, { useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';

function Header() {
  const TABLE_HEADER = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'Url',
  ];

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
    columnSort,
    setColumnSort,
    sort,
    setSort,
    change,
    setChange,
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
      setData(
        data.filter((planet) => {
          if (filter.comparisonFilter === 'greater than') {
            return Number(planet[filter.columnFilter]) > filter.numericalFilter;
          }
          if (filter.comparisonFilter === 'less than') {
            return Number(planet[filter.columnFilter]) < filter.numericalFilter;
          }
          return Number(planet[filter.columnFilter]) === Number(filter.numericalFilter);
        }),
      );
    });
  }, [data, filterList, setData, unfilteredData]);

  function handleButtonSubmit() {
    setColumns(columns.filter((column) => column !== columnFilter));
    const newFilter = { columnFilter, comparisonFilter, numericalFilter };
    setFilterList([...filterList, newFilter]);
  }

  function handleDeleteFilter(parameter) {
    setFilterList(filterList.filter((filter) => filter.columnFilter !== parameter));
  }

  function handleSort() {
    function maior(a, b) {
      if (sort === 'ASC') {
        return a[columnSort] > b[columnSort];
      }
      if (sort === 'DESC') {
        return a[columnSort] < b[columnSort];
      }
    }
    if (columns.includes(columnSort)) {
      let novoArray = [];
      if (sort === 'DESC') {
        novoArray = data.sort((a, b) => b[columnSort] - a[columnSort]);
      } else {
        novoArray = data.sort((a, b) => a[columnSort] - b[columnSort]);
      }
      setData(novoArray);
    } else {
      setData(
        data.sort((a, b) => {
          if (maior(a, b)) {
            return 1;
          }
          if (maior(b, a)) {
            return 1 - 2;
          }
          return 0;
        }),
      );
    }
    setChange(!change);
  }

  useEffect(() => {
    handleSort();
    console.log(data);
  }, [data]);

  return (
    <header>
      <h1 id="app-title">Star Wars Planets Search</h1>
      <form>
        <input
          type="text"
          placeholder="Search by planet name"
          data-testid="name-filter"
          onChange={handleTextInputChange}
        />
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={(e) => setColumnFilter(e.target.value)}
          value={columnFilter}
        >
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={(e) => setComparisonFilter(e.target.value)}
          value={comparisonFilter}
        >
          {comparisons.map((comparison) => (
            <option key={comparison} value={comparison}>
              {comparison}
            </option>
          ))}
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={(e) => setNumericalFilter(e.target.value)}
          value={numericalFilter}
        />
        <button type="button" data-testid="button-filter" onClick={handleButtonSubmit}>
          Filter
        </button>
      </form>
      <div id="filter-list">
        {filterList.map((filter, index) => (
          <p key={index} data-testid="filter">
            {`${filter.columnFilter}
              ${filter.comparisonFilter}
              ${filter.numericalFilter}`}
            <button type="button" onClick={() => handleDeleteFilter(filter.columnFilter)}>
              X
            </button>
          </p>
        ))}
      </div>
      <div>
        <select data-testid="column-sort" onChange={(e) => setColumnSort(e.target.value)}>
          {TABLE_HEADER.map((column) => (
            <option key={column} value={column.toLowerCase().replace(' ', '_')}>
              {column}
            </option>
          ))}
        </select>
        <label htmlFor="ASC">
          Ascending
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="sort"
            id="ASC"
            value="ASC"
            onChange={(e) => setSort(e.target.value)}
          />
        </label>
        <label htmlFor="DESC">
          Descending
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="sort"
            id="DESC"
            value="DESC"
            onChange={(e) => setSort(e.target.value)}
          />
        </label>
        <button type="button" data-testid="column-sort-button" onClick={handleSort}>
          Sort
        </button>
      </div>
    </header>
  );
}

export default Header;
