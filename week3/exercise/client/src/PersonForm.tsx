
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PERSON } from '../graphql/mutations';

const PersonForm: React.FC = () => {
    const [person, setPerson] = useState({
        name: '',
        email: '',
        age: 0
    });

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: ['GetPeople'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPerson({ variables: { name: person.name, email: person.email, age: person.age } });
  };

  return (
    <div>
      <h2>Create a new person</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={"name"} onChange={(e) => setPerson({...person, name: e.target.value})} />
          Email:
          <input type="text" value={"email"} onChange={(e) => setPerson({...person, email: e.target.value})} />
          Age:
          <input type="number" value={"age"} onChange={(e) => setPerson({...person, age: parseInt(e.target.value)})} />

        </label>
        <button type="submit">Create Person</button>
      </form>
    </div>
  );
};

export default PersonForm;
