import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';

const Provider = ({ children }) => {
  // define useState para os dados
  const [data, setData] = useState([]);

  // faz fetch dos dados
  const fetchData = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();

    // remove a coluna 'residents' do array 'results'
    results.forEach((result) => delete result.residents);

    setData(results);
  };

  // usa o método useState como componentDidMount(), passando a função fetchData
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={ { data, setData } }>
      {children}
    </DataContext.Provider>
  );
};

// validação de props
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
