import React, { useContext } from 'react';
import DataContext from '../context/DataContext';

const TABLE_HEADER = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
  'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited',
  'Url'];

function Table() {
  const { data } = useContext(DataContext);
  const { nameFilter } = useContext(DataContext);

  return (
    <table>
      <thead>
        <tr>
          {TABLE_HEADER.map((column) => (
            <th key={ column }>{column}</th>
          ))}
        </tr>
      </thead>
      {data.filter((planet) => planet.name.includes(nameFilter)).map((planet) => (
        <tbody key={ planet.name }>
          <tr>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default Table;
