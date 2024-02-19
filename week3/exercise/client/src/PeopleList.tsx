import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../graphql/queries';
import { Person } from './types';

const PeopleList: React.FC = () => {

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const people = data.persons;

  return (
    <div>
      <h2>People</h2>
      <ul>
        {people.map((person: Person) => (
          <li key={person.id}>
            {person.name} ({person.email}) - {person.age} years
            </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
