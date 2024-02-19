import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PERSON_DETAILS } from '../graphql/queries';

const PersonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_PERSON_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const person = data.person;

  return (
    <div>
      <h2>{person.name} Details</h2>
      <p>Address: {person.address}</p>
      <img src={person.imageUrl} alt={person.name} />
    </div>
  );
};

export default PersonDetails;
