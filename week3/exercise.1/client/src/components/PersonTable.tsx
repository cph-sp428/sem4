import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ADDRESSES, GET_PEOPLE } from "../data/queries";
import { Address, Person } from "../data/types";
import { DELETE_PERSON } from "../data/mutations";

function PersonTable() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }, { query: GET_ADDRESSES }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if(data.people.length === 0) return (<p>No people found</p>);

  return (
    <div id="person-table">
      <h3>PERSON TABLE: </h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address Ids</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.people.map((person: Person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.age}</td>
              <td>
                {person.addresses?.map((address: Address) => (
                  <p key={address.id}>{address.id} </p>
                ))}
              </td>
              <td>
                <button
                  onClick={() => deletePerson({ variables: { id: person.id } })}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonTable;
