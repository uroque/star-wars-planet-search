// import { useContext } from 'react';
// import DataContext from '../context/DataContext';

// fetches data
const fetchData = async () => {
  // const { setData } = useContext(DataContext);
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await response.json();

  // removes the column 'residents' from 'results'
  results.forEach((result) => delete result.residents);
  setData(results);
  return results;
};

export default fetchData;
