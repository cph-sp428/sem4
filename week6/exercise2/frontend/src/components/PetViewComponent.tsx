import { useQuery } from '@apollo/client';
import { GET_ALL_PETS } from '../graphql/queries';
import { Pet } from '../types';

function PetViewComponent() {

    const { loading, error, data } = useQuery(GET_ALL_PETS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    const pets : Pet[] = data.getAllPets;

    return ( 
        <div id="PetViewComponent">
            <h1>Pet View Component</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Age</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet: Pet) => (
                        <tr key={pet.id}>
                            <td>{pet.id}</td>
                            <td>{pet.name}</td>
                            <td>{pet.species}</td>
                            <td>{pet.age}</td>
                            <td>{pet.owner.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}

export default PetViewComponent;