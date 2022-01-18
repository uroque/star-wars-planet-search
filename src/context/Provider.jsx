import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';

const Provider = ({ children }) => {
  // defines useState for the data
  const [data, setData] = useState([]);

  const [unfilteredData, setUnfilteredData] = useState([]);

  // defines useState for the 'name' filter
  const [nameFilter, setNameFilter] = useState({
    filterByName: {
      name: '',
    },
  });

  const filterByNumericValues = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };

  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [comparisons, setComparisons] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  const [filterList, setFilterList] = useState([]);

  const [columnFilter, setColumnFilter] = useState(filterByNumericValues.column);

  const [comparisonFilter, setComparisonFilter] = useState(
    filterByNumericValues.comparison,
  );

  const [numericalFilter, setNumericalFilter] = useState(0);

  const [columnSort, setColumnSort] = useState('name');

  const [sort, setSort] = useState('ASC');

  const [change, setChange] = useState(true);

  // fetches data
  const fetchData = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();

    // removes 'residents' column from 'results'
    results.forEach((result) => delete result.residents);

    // sets the value of 'data' to be equal to the 'results' array
    setData(results);
    setUnfilteredData(results);
  };

  // uses useState method as componentDidMount(), passing the fetchData function
  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    data,
    setData,
    nameFilter,
    setNameFilter,
    columns,
    setColumns,
    comparisons,
    setComparisons,
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
  };

  return (
    <DataContext.Provider value={ value }>
      {children}
    </DataContext.Provider>
  );
};

// props validation
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
