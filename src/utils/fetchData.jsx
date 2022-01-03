// faz fetch dos dados
const fetchData = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await response.json();

  // remove a coluna 'residents' do array 'results'
  results.forEach((result) => delete result.residents);
  return results;
};

export default fetchData;
